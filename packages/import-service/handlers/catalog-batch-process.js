import { pgDatabaseService } from '../services/pg-database.service';
import { getErrorCode } from '../../shared/src/errors';

export const catalogBatchProcess = async (event) => {
  const productsToSave = event.Records.map(({ body: stringifiedProduct }) => {
    return pgDatabaseService.create(stringifiedProduct);
  });

  try {
    await Promise.all(productsToSave);

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
