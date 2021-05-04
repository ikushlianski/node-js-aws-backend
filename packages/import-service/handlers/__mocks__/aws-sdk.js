export const getObject = jest.fn(() => Promise.resolve());
export const putObject = jest.fn(() => Promise.resolve());
export const getSignedUrl = jest.fn(() => Promise.resolve());
export const deleteObject = jest.fn(() => Promise.resolve());
export const copyObject = jest.fn(() => Promise.resolve());

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
};

export default AWS;
