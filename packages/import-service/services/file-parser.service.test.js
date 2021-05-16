import { fileParserService } from './file-parser.service';
import {
  copyObject,
  deleteObject,
  getObject,
} from '../handlers/__mocks__/aws-sdk';
import { Readable } from 'stream';
import csvParser from 'csv-parser';

jest.mock('csv-parser');

describe('fileParserService', function () {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFileNameFromKey', () => {
    it('should get filename with extension from bucket object key', () => {
      const key =
        'epam-aws-training-task-5-upload/parsed/uploaded/products.csv';
      const filename = fileParserService.getFileNameFromKey(key);

      expect(filename).toBe('products.csv');
    });
  });

  describe('makeS3DeleteObjectHandle', () => {
    it('should call s3.deleteObject with correct delete params', () => {
      fileParserService.makeS3DeleteObjectHandle('bucket', 'uploaded/file');

      expect(deleteObject).toHaveBeenCalledWith({
        Bucket: 'bucket',
        Key: 'uploaded/file',
      });
    });
  });

  describe('makeS3GetObjectHandle', () => {
    it('should call s3.getObject with correct delete params', () => {
      fileParserService.makeS3GetObjectHandle('bucket', 'uploaded/file');

      expect(getObject).toHaveBeenCalledWith({
        Bucket: 'bucket',
        Key: 'uploaded/file',
      });
    });
  });

  describe('makeS3CopyObjectHandle', () => {
    it('should call s3.copyObject with correct copy params', () => {
      jest
        .spyOn(fileParserService, 'getFileNameFromKey')
        .mockReturnValue('products.csv');

      fileParserService.makeS3CopyObjectHandle('bucket', 'uploaded/file');

      expect(copyObject).toHaveBeenCalledWith({
        Bucket: 'bucket',
        CopySource: `bucket/${process.env.UPLOADED_FOLDER}/products.csv`,
        Key: `${process.env.PARSED_FOLDER}/products.csv`,
      });
    });
  });

  describe('moveFileToParsedFolder', () => {
    it('should call s3CopyObjectHandle and s3DeleteObjectHandle', async () => {
      const s3CopyHandle = {
        promise: jest.fn(() => Promise.resolve()),
      };

      const s3DeleteHandle = {
        promise: jest.fn(() => Promise.resolve()),
      };

      await fileParserService.moveFileToParsedFolder(
        s3CopyHandle,
        s3DeleteHandle,
      );

      expect(s3CopyHandle.promise).toHaveBeenCalledTimes(1);
      expect(s3DeleteHandle.promise).toHaveBeenCalledTimes(1);
    });
  });

  describe('getObjectParamsFromEvent', () => {
    it('should get correct object params from AWS S3 event', async () => {
      const event = {
        Records: [
          {
            s3: {
              object: {
                key: 'TEST OBJECT',
              },
              bucket: {
                name: 'TEST BUCKET',
              },
            },
          },
        ],
      };
      const result = fileParserService.getObjectParamsFromEvent(event);

      expect(result.bucket).toBe('TEST BUCKET');
      expect(result.key).toBe('TEST OBJECT');
    });
  });

  describe('parseS3FileContents', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call csvParser when reading the stream', async (done) => {
      expect.assertions(1);

      const mockStream = Readable.from(['value1']);

      const s3ObjectHandle = {
        createReadStream: jest.fn().mockReturnValue(mockStream),
      };

      jest.spyOn(fileParserService, 'handleDataChunk').mockImplementation();

      fileParserService.parseS3FileContents(s3ObjectHandle).then((result) => {
        expect(csvParser).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
