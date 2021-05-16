import { PassThrough } from 'stream';

console.log('INSIDE MOCKED CSV PARSER FUNCTION!');

export default jest.fn().mockReturnValue(new PassThrough());
