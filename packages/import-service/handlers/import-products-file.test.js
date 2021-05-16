import { importProductsFile } from './import-products-file';
import { getSignedUrl } from './__mocks__/aws-sdk';
import { getCorsHeaders } from '../../shared/src/utils/cors-headers';

jest.mock('aws-sdk');
jest.mock('../../shared/src/utils/cors-headers');

describe('importProductsFile', function () {
  it('should form correct signed url params', async () => {
    const event = {
      queryStringParameters: {
        name: 'abc',
      },
    };

    getCorsHeaders.mockReturnValue({});

    await importProductsFile(event);

    expect(getSignedUrl).toHaveBeenCalledWith('putObject', {
      Bucket: process.env.UPLOAD_BUCKET,
      Key: `${process.env.UPLOADED_FOLDER}/abc`,
    });
  });

  it('should return correct response in case of success', async () => {
    const event = {
      queryStringParameters: {
        name: 'abc',
      },
    };

    getCorsHeaders.mockReturnValue({ header1: 'value' });
    getSignedUrl.mockResolvedValueOnce('signedUrl');

    const result = await importProductsFile(event);

    expect(result).toEqual({
      statusCode: 200,
      body: 'signedUrl',
      headers: {
        header1: 'value',
      },
    });
  });

  it('should return correct response in case of error', async () => {
    const event = {
      queryStringParameters: {
        name: 'abc',
      },
    };
    const errorMessage = 'some error';

    getCorsHeaders.mockReturnValue({ header1: 'value' });
    getSignedUrl.mockRejectedValueOnce(new Error(errorMessage));

    const result = await importProductsFile(event);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify(errorMessage),
      headers: {
        header1: 'value',
      },
    });
  });
});
