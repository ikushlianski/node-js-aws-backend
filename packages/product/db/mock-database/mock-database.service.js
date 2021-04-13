import { products } from './mock-data';

export class MockDatabaseService {
  async find() {
    return Promise.resolve(products);
  }

  async findOne(id) {
    const product = products.filter((prod) => prod.id === Number(id));

    return Promise.resolve(product);
  }
}

export const mockDbService = new MockDatabaseService();
