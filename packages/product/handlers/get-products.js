import { ProductService } from '../services/product.service';
import { getCorsHeaders } from '../../shared/src/utils/cors-headers';
import { pgDatabaseService } from '../db/postgres/pg-database.service';

const productService = new ProductService(pgDatabaseService);

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
