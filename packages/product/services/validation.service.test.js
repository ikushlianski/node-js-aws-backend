import { productValidator } from './validation.service';

describe('Validation Service', function () {
  describe('validateProductId()', function () {
    it('Should return true is valid number is passed', () => {
      expect(productValidator.validateProductId(5)).toBe(true);
    });

    it('Should throw error if string is passed', () => {
      expect(() => productValidator.validateProductId('some string')).toThrow();
    });

    it('Should throw error if undefined is passed', () => {
      expect(() => productValidator.validateProductId(undefined)).toThrow();
    });
  });
});
