export const getObject = jest.fn(() => Promise.resolve());
export const putObject = jest.fn(() => Promise.resolve());
export const getSignedUrl = jest.fn(() => Promise.resolve());
export const deleteObject = jest.fn(() => Promise.resolve());
export const copyObject = jest.fn(() => Promise.resolve());
export const sendMessage = jest.fn(() => Promise.resolve());

export let publish;
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
