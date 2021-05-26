import {
  copyObject,
  deleteObject,
  getObject,
  getSignedUrl,
  putObject,
} from '../../../import-service/handlers/__mocks__/aws-sdk';

export let publish;

export const sendMessage = jest.fn(() => Promise.resolve());
export const promise = jest.fn(() => Promise.resolve());

const AWS = {
  S3: class S3 {
    constructor() {
      this.getObject = getObject;
      this.putObject = putObject;
      this.getSignedUrl = getSignedUrl;
      this.deleteObject = deleteObject;
      this.copyObject = copyObject;
    }
  },
  SQS: class SQS {
    constructor() {
      this.sendMessage = sendMessage;
    }
  },

  SNS: class SNS {
    constructor() {
      publish = jest.fn().mockReturnValue(this);
      this.publish = publish;
      this.promise = promise;
    }
  },
};

export default AWS;
