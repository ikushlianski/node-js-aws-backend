import { pgDatabaseService } from '../services/pg-database.service';
import { getErrorCode } from '../../shared/src/errors';
import AWS from 'aws-sdk';

const sns = new AWS.SNS();

export const catalogBatchProcess = async (event) => {
  const productSavePromises = event.Records.map(
    ({ body: stringifiedProduct }) => {
      return pgDatabaseService.create(stringifiedProduct);
    },
  );

  try {
    await Promise.all(productSavePromises);

    const parsedProducts = event.Records.map(({ body: stringifiedProduct }) => {
      return JSON.parse(stringifiedProduct);
    });

    const messagePromises = parsedProducts.map((product) => {
      return sns
        .publish({
          Subject: `${product.title} uploaded`,
          Message: JSON.stringify(product),
          TopicArn: process.env.CREATE_PRODUCT_TOPIC,
          MessageAttributes: {
            title: {
              DataType: 'String',
              StringValue: product.title,
            },
          },
        })
        .promise();
    });

    await Promise.all(messagePromises);

    return {
      statusCode: 200,
      body: 'Success',
    };
  } catch (error) {
    console.error('Error inserting products', error);

    return {
      statusCode: getErrorCode(error),
      body: 'Failed to insert records into DB',
    };
  }
};
