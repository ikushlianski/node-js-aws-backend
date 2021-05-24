import { catalogBatchProcess } from './catalog-batch-process';
import { pgDatabaseService } from '../db/postgres/pg-database.service';
import { publish } from './__mocks__/aws-sdk';

jest.mock('aws-sdk');
jest.mock('pg');

const event = {
  Records: [
    {
      body: '{"id":"1","title":"test title 1"}',
    },
    {
      body: '{"id":"2","title":"test title 2"}',
    },
  ],
};

describe('CatalogBatchProcess', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call create method on pgDatabaseService twice', async () => {
    const createSpy = jest
      .spyOn(pgDatabaseService, 'create')
      .mockReturnValue(null);

    jest.spyOn(Promise, 'all').mockImplementation();

    await catalogBatchProcess(event);

    expect(createSpy).toHaveBeenCalledTimes(2);
  });

  it('should call sns.publish with required params', async () => {
    jest.spyOn(pgDatabaseService, 'create').mockReturnValue(null);

    jest.spyOn(Promise, 'all').mockImplementation();

    await catalogBatchProcess(event);

    expect(publish).toHaveBeenNthCalledWith(1, {
      Subject: `test title 1 uploaded`,
      Message: event.Records[0].body,
      TopicArn: process.env.CREATE_PRODUCT_TOPIC,
      MessageAttributes: {
        title: {
          DataType: 'String',
          StringValue: 'test title 1',
        },
      },
    });
  });

  it('should call sns.publish twice', async () => {
    jest.spyOn(pgDatabaseService, 'create').mockReturnValue(null);

    jest.spyOn(Promise, 'all').mockImplementation();

    await catalogBatchProcess(event);

    expect(publish).toHaveBeenCalledTimes(2);
  });

  it('should return error response if anything fails in the handler', async () => {
    jest.spyOn(pgDatabaseService, 'create').mockReturnValue(null);

    jest.spyOn(Promise, 'all').mockRejectedValue(new Error('some error'));
    jest.spyOn(console, 'error').mockImplementation();

    const result = await catalogBatchProcess(event);

    expect(result).toEqual({
      statusCode: 500,
      body: 'Failed to insert records into DB',
    });
  });
});
