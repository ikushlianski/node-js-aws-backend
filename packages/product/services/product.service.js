import { dbService } from '../db/database.service';
import { productValidator } from './validation.service';

export class ProductService {
  async getAll() {
    return dbService.find();
  }

  async getOne(id) {
    // todo catch error outside
    productValidator.validateProductId(id);

    return dbService.findOne(id);
  }
}

export const productService = new ProductService();
