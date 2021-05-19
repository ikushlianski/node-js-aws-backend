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

    const parsedProductTitles = event.Records.map(
      ({ body: stringifiedProduct }) => {
        return JSON.parse(stringifiedProduct);
      },
    ).map((prod) => prod.title);

    await sns
      .publish({
        Subject: 'Products uploaded',
        Message: buildMessage(parsedProductTitles),
        TopicArn: process.env.CREATE_PRODUCT_TOPIC,
      })
      .promise();

    return {
      statusCode: 200,
      body: 'Success',
    };
  } catch (error) {
    console.log('Error inserting products', error);

    return {
      statusCode: getErrorCode(error),
      body: 'Failed to insert records into DB',
    };
  }
};

function buildMessage(productTitles) {
  return `The following products were saved successfully:\n${productTitles.join(
    '\n',
  )}`;
}
