import { ProductService } from './product.service';

describe('Product Service', function () {
  describe('getAll()', function () {
    const initSpec = async (productList = ['product1', 'product2']) => {
      const mockPgDatabaseService = {
        find: jest.fn().mockResolvedValue(productList),
        findOne: jest.fn(),
      };
      const productService = new ProductService(mockPgDatabaseService);
      const result = await productService.getAll();

      return { result, productList };
    };

    it('should return the desired list of products', async () => {
      const products = ['some', 'product', 'list'];
      const { result, productList } = await initSpec(products);

      expect(result).toEqual(productList);
    });
  });

  describe('getOne()', function () {
    const initSpec = async (mockProduct) => {
      const mockPgDatabaseService = {
        find: jest.fn(),
        findOne: jest.fn().mockResolvedValue(mockProduct),
      };
      const productService = new ProductService(mockPgDatabaseService);
      let result, error;

      try {
        result = await productService.getOne(mockProduct.id);
      } catch (e) {
        error = e;
      }

      return { result, error };
    };

    it('should return product with id eeaf9772-f6b2-4896-b569-3f5a2b30dc4d', async () => {
      const mockProduct = {
        id: 'eeaf9772-f6b2-4896-b569-3f5a2b30dc4d',
        name: 'test product',
      };
      const { result } = await initSpec(mockProduct);

      expect(result.id).toBe('eeaf9772-f6b2-4896-b569-3f5a2b30dc4d');
    });

    it('should not throw error if valid product id is passed', async () => {
      const mockProduct = {
        id: 'eeaf9772-f6b2-4896-b569-3f5a2b30dc4d',
        name: 'test product',
      };
      const { result, error } = await initSpec(mockProduct);

      expect(result).not.toBeFalsy();
      expect(error).toBeFalsy();
    });

    it('should throw error if invalid product id is passed', async () => {
      const mockProduct = { id: 'invalid-id', name: 'test product' };
      const { result, error } = await initSpec(mockProduct);

      expect(error).not.toBeFalsy();
      expect(result).toBeFalsy();
    });
  });
});
