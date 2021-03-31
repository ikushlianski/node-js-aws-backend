import { products } from './mock-data';

export class DatabaseService {
  async find() {
    return Promise.resolve(products);
  }

  async findOne(id) {
    const product = products.find((prod) => prod.id === id);

    return Promise.resolve(product);
  }
}

export const dbService = new DatabaseService();
