import path from 'path';
import AWS from 'aws-sdk';
import csvParser from 'csv-parser';

const s3 = new AWS.S3();
const sqs = new AWS.SQS();

class FileParserService {
  async parseS3FileContents(s3ObjectHandle) {
    const productTitles = [];
    const stream = s3ObjectHandle.createReadStream();

    return new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (data) => {
          this.handleDataChunk(data, productTitles);
        })
        .on('error', (error) => {
          console.error(error);

          reject(error);
        })
        .on('end', () => {
          console.log('Finish parsing products');

          resolve();
        });
    });
  }

  handleDataChunk(chunk, productTitles) {
    productTitles.push(chunk.title);

    const messageBody = JSON.stringify(chunk);

    console.log('==> messageBody:', messageBody);

    sqs.sendMessage(
      {
        QueueUrl: process.env.CATALOG_ITEMS_QUEUE,
        MessageBody: messageBody,
      },
      () => {
        console.log('Message sent for chunk title', chunk.title);
      },
    );
  }

  getObjectParamsFromEvent(event) {
    const bucket = event.Records[0].s3.bucket.name;

    console.log('Put event triggered for bucket', bucket);

    const key = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, ' '),
    );

    console.log('object key:', key);

    return { bucket, key };
  }

  async moveFileToParsedFolder(s3CopyObjectHandle, s3DeleteObjectHandle) {
    await s3CopyObjectHandle.promise();
    await s3DeleteObjectHandle.promise();
  }

  makeS3GetObjectHandle(bucket, key) {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    return s3.getObject(params);
  }

  makeS3CopyObjectHandle(bucket, key) {
    const fileBaseName = this.getFileNameFromKey(key);

    const copyParams = {
      Bucket: bucket,
      CopySource: `${bucket}/${process.env.UPLOADED_FOLDER}/${fileBaseName}`,
      Key: `${process.env.PARSED_FOLDER}/${fileBaseName}`,
    };

    console.log('Copy params:');
    console.dir(copyParams);

    return s3.copyObject(copyParams);
  }

  makeS3DeleteObjectHandle(bucket, key) {
    const deleteParams = {
      Bucket: bucket,
      Key: key,
    };

    return s3.deleteObject(deleteParams);
  }

  getFileNameFromKey(key) {
    return path.basename(key);
  }
}

export const fileParserService = new FileParserService();
