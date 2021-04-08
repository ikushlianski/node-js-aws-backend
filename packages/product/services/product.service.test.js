import 'regenerator-runtime/runtime';
import { ProductService } from './product.service';
import { pgDatabaseService } from '../db/postgres/pg-database.service';

// TODO fix openHanders in tests
describe('Product Service', function () {
  describe('getAll()', function () {
    const initSpec = async (productList = ['product1', 'product2']) => {
      jest.spyOn(pgDatabaseService, 'find').mockResolvedValue(productList);

      const productService = new ProductService(pgDatabaseService);
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
      jest.spyOn(pgDatabaseService, 'findOne').mockResolvedValue(mockProduct);

      const productService = new ProductService(pgDatabaseService);
      let result, error;

      try {
        result = await productService.getOne(mockProduct.id);
      } catch (e) {
        error = e;
      }

      return { result, error };
    };

    it('should return product with id 1', async () => {
      const mockProduct = { id: 1, name: 'test product' };
      const { result } = await initSpec(mockProduct);

      expect(result.id).toBe(1);
    });

    it('should not throw error if valid product id is passed', async () => {
      const mockProduct = { id: 1, name: 'test product' };
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
