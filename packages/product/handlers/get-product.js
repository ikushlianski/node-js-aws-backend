import { ProductService } from '../services/product.service';
import { getErrorCode } from '../../shared/src/errors';
import { getCorsHeaders } from '../../shared/src/utils/cors-headers';
import { pgDatabaseService } from '../db/postgres/pg-database.service';

const productService = new ProductService(pgDatabaseService);

export const getProduct = async (event) => {
  const { id } = event.pathParameters;
  const corsHeaders = getCorsHeaders();
  const headers = { ...corsHeaders };

  try {
    const result = await productService.getOne(id);
    const body = JSON.stringify(result);

    return result.length === 0
      ? { statusCode: 404, body: 'Not found', headers }
      : {
          statusCode: 200,
          body,
          headers,
        };
  } catch (error) {
    return {
      statusCode: getErrorCode(error),
      body: JSON.stringify(error.message),
      headers,
    };
  }
};
