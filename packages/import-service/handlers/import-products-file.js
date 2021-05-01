import AWS from 'aws-sdk';
import { getErrorCode } from '../../shared/src/errors';

export const importProductsFile = async (event) => {
  const s3 = new AWS.S3();
  const productsFileName = event.queryStringParameters.name;

  console.log('productsFileName from query params:', productsFileName);

  const signedUrlParams = {
    Bucket: process.env.UPLOAD_BUCKET,
    Key: productsFileName,
  };

  console.log('signedUrlParams:', signedUrlParams);

  try {
    const signedUrl = await s3.getSignedUrl('putObject', signedUrlParams);

    console.log('Generated signed URL:', signedUrl);

    return {
      statusCode: 200,
      body: signedUrl,
    };
  } catch (error) {
    console.error('Error getting signed URL:', error);

    return {
      statusCode: getErrorCode(error),
      body: JSON.stringify(error.message),
    };
  }
};
