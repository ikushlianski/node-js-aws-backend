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

  describe('create product', function () {
    const initSpec = async (mockProduct) => {
      const generatedUuid = 'some generated uuid';

      const mockPgDatabaseService = {
        create: jest
          .fn()
          .mockResolvedValue({ ...mockProduct, id: generatedUuid }),
      };
      const productService = new ProductService(mockPgDatabaseService);
      let result, error;

      try {
        result = await productService.create(mockProduct);
      } catch (e) {
        error = e;
      }

      return { result, error, mockPgDatabaseService, generatedUuid };
    };

    it('should throw error if title is missing', async () => {
      const { result, error } = await initSpec({
        description: 'some description',
        count: 1,
        price: 15,
      });

      expect(error).not.toBeFalsy();
      expect(result).toBeUndefined();
    });

    it('should throw error if count is missing', async () => {
      const { result, error } = await initSpec({
        description: 'some description',
        title: 'Some product without count',
        price: 15,
      });

      expect(error).not.toBeFalsy();
      expect(result).toBeUndefined();
    });

    it('should throw error if price is missing', async () => {
      const { result, error } = await initSpec({
        description: 'some description',
        title: 'Some product without price',
        count: 7,
      });

      expect(error).not.toBeFalsy();
      expect(result).toBeUndefined();
    });

    it('should call DB service with valid product parameters to be saved', async () => {
      const { result, error, mockPgDatabaseService } = await initSpec({
        description: 'some description',
        title: 'Some product without price',
        count: 7,
        price: 20,
      });

      expect(mockPgDatabaseService.create).toHaveBeenCalledTimes(1);
      expect(mockPgDatabaseService.create).toHaveBeenCalledWith({
        description: 'some description',
        title: 'Some product without price',
        count: 7,
        price: 20,
      });
    });

    it('should return a generated product id', async () => {
      const { generatedUuid, result } = await initSpec({
        description: 'some description',
        title: 'Some product without price',
        count: 7,
        price: 20,
      });

      expect(result).toEqual({
        description: 'some description',
        title: 'Some product without price',
        count: 7,
        price: 20,
        id: generatedUuid,
      });
    });
  });
});
