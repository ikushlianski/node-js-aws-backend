import { ProductService } from '../services/product.service';
import { mockDbService } from '../db/mock-database/mock-database.service';
import { getErrorCode } from '../../shared/src/errors';

const productService = new ProductService(mockDbService);

export const getProduct = async (event) => {
  const { id } = event.pathParameters;

  try {
    const result = await productService.getOne(id);
    const body = JSON.stringify(result);

    return result.length === 0
      ? { statusCode: 404, body: 'Not found' }
      : {
          statusCode: 200,
          body,
        };
  } catch (error) {
    return {
      statusCode: getErrorCode(error),
      body: JSON.stringify(error.message),
    };
  }
};
