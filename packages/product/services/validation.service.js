import { HTTP_ERRORS } from '../../shared/src/errors';

export class ProductValidationService {
  validateProductId(id) {
    if (this.isValidNumber(id)) return true;

    const error = new Error(`${id} is invalid parameter`);

    error.name = HTTP_ERRORS.UNPROCESSABLE_ENTITY;
    throw error;
  }

  isValidNumber(input) {
    return isNaN(input) === false;
  }
}

export const productValidator = new ProductValidationService();
