import { productValidator } from './validation.service';

describe('Validation Service', function () {
  describe('validateProductId()', function () {
    it('Should return true if a valid uuidv4 is passed', async () => {
      const res = await productValidator.validateProductId(
        'eeaf9772-f6b2-4896-b569-3f5a2b30dc4d',
      );

      expect(res).toBe(true);
    });

    it('Should not return true if number is passed', async () => {
      const res = productValidator.validateProductId(5);

      await expect(res).rejects.toThrow();
    });

    it('Should not return true if a non-uuid string is passed', async () => {
      const res = productValidator.validateProductId('some string');

      await expect(res).rejects.toThrow();
    });

    it('Should throw error if undefined is passed', async () => {
      const res = productValidator.validateProductId(undefined);

      await expect(res).rejects.toThrow();
    });
  });
});
