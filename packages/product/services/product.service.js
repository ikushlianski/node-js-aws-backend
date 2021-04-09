import { productValidator } from './validation.service';

export class ProductService {
  constructor(dbService) {
    this.dbService = dbService;
  }

  async getAll() {
    return this.dbService.find();
  }

  async getOne(id) {
    await productValidator.validateProductId(id);

    return this.dbService.findOne(id);
  }

  async create(product) {
    await productValidator.validateProductBody(product);

    return this.dbService.create(product);
  }
}
