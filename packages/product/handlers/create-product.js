import { ProductService } from '../services/product.service';
import { getErrorCode } from '../../shared/src/errors';
import { getCorsHeaders } from '../../shared/src/utils/cors-headers';
import { pgDatabaseService } from '../db/postgres/pg-database.service';

const productService = new ProductService(pgDatabaseService);

export const createProduct = async (event) => {
  const corsHeaders = getCorsHeaders();
  const headers = { ...corsHeaders };
  const { body: productData } = event;

  console.log('create-product handler :: Received data', productData);

  try {
    const productId = await productService.create(productData);

    return {
      statusCode: 201,
      body: JSON.stringify({ id: productId }),
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
