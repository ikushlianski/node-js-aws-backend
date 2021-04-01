import { ProductService } from '../services/product.service';
import { mockDbService } from '../db/mock-database/mock-database.service';

const productService = new ProductService(mockDbService);

export const getProducts = async (event) => {
  try {
    const result = await productService.getAll();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
    };
  }
};
