import { fileParserService } from '../services/file-parser.service';

export const importFileParser = async (event) => {
  const { bucket, key } = fileParserService.getObjectParamsFromEvent(event);

  console.log('bucket', bucket);
  console.log('key', key);

  const s3GetObjectHandle = fileParserService.makeS3GetObjectHandle(
    bucket,
    key,
  );

  try {
    await fileParserService.parseS3FileContents(s3GetObjectHandle);

    const s3CopyObjectHandle = fileParserService.makeS3CopyObjectHandle(
      bucket,
      key,
    );

    const s3DeleteObjectHandle = fileParserService.makeS3DeleteObjectHandle(
      bucket,
      key,
    );

    await fileParserService.moveFileToParsedFolder(
      s3CopyObjectHandle,
      s3DeleteObjectHandle,
    );

    return {
      // or 201 if we actually wrote parsed data to DB
      statusCode: 200,
    };
  } catch (err) {
    console.log(err);

    const message = `Error processing object ${key} from bucket ${bucket}.
    Details: ${err}`;

    console.log(message);
    throw new Error(message);
  }
};
