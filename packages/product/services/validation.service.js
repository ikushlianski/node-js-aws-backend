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
}

export const productValidator = new ProductValidationService();
