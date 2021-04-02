import { ProductService } from '../services/product.service';
import { mockDbService } from '../db/mock-database/mock-database.service';
import { getCorsHeaders } from '../../shared/src/utils/cors-headers';

const productService = new ProductService(mockDbService);

export const getProducts = async (event) => {
  const corsHeaders = getCorsHeaders();
  const headers = { ...corsHeaders };

  try {
    const result = await productService.getAll();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
      headers,
    };
  }
};
