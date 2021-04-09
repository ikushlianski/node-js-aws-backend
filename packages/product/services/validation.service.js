import * as yup from 'yup';
import { HTTP_ERRORS } from '../../shared/src/errors';

export class ProductValidationService {
  async validateProductId(id) {
    const uuidSchema = yup.string().uuid().required();
    const isValid = await uuidSchema.isValid(id);

    if (isValid) return true;

    const error = new Error(`${id} is invalid parameter`);

    error.name = HTTP_ERRORS.UNPROCESSABLE_ENTITY;
    throw error;
  }

  async validateProductBody(product) {
    const productSchema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string(),
      price: yup.number().required(),
      count: yup.number().required(),
    });
    const isValid = await productSchema.isValid(product);

    if (isValid) return true;

    const error = new Error(`Invalid product parameters`);

    error.name = HTTP_ERRORS.BAD_REQUEST;
    throw error;
  }
}

export const productValidator = new ProductValidationService();
