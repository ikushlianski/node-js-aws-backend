import { fileParserService } from './file-parser.service';

describe('fileParserService', function () {
  describe('getFileNameFromKey', () => {
    it('should get filename with extension from bucket object key', () => {
      const key =
        'epam-aws-training-task-5-upload/parsed/uploaded/products.csv';
      const filename = fileParserService.getFileNameFromKey(key);

      expect(filename).toBe('products.csv');
    });
  });
});
