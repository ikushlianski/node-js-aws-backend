import { getErrorCode, HTTP_ERRORS } from './errors';

describe('Errors', function () {
  describe('getErrorCode()', function () {
    it('should output 422 error code if the supplied error has a name of UNPROCESSABLE_ENTITY', () => {
      const err = new Error('some message');

      err.name = HTTP_ERRORS.UNPROCESSABLE_ENTITY;

      const code = getErrorCode(err);

      expect(code).toBe(422);
    });

    it('should output 500 error code if the supplied error does not have HTTP-error-code-specific name', () => {
      const err = new Error('some message');
      const code = getErrorCode(err);

      expect(code).toBe(500);
    });

    it('should output 500 error code if the supplied error has unsupported HTTP-error-code-specific name', () => {
      const err = new Error('some message');

      err.name = 'TEAPOT';

      const code = getErrorCode(err);

      expect(code).toBe(500);
    });
  });
});
