import AWS from 'aws-sdk';

export const importFileParser = async (event) => {
  const s3 = new AWS.S3();
  const bucket = event.Records[0].s3.bucket.name;

  console.log('--------->', bucket);

  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ' '),
  );

  const params = {
    Bucket: bucket,
    Key: key,
  };

  console.dir(params);

  try {
    console.log('trying to get object from s3');

    const data = await s3.getObject(params).promise();

    console.log('data in the PROD FILE:', data);

    return {
      statusCode: 200,
    };
  } catch (err) {
    console.log(err);

    const message = `Error getting object ${key} from bucket ${bucket}`;

    console.log(message);
    throw new Error(message);
  }
};
