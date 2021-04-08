import { Client } from 'pg';

require('dotenv').config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

export class PgDatabaseService {
  constructor(client) {
    this.client = client;
    this.client.connect();
  }

  async find() {
    console.log('process.env.PGHOST', process.env.PGHOST);
    console.log('process.env.PGUSER', process.env.PGUSER);

    const { rows: products } = await this.client.query(`
      select product.*, stocks.count from product
      join stocks on product.id = stocks.product_id;
    `);

    console.log('Returned %d products', products.length);

    return products;
  }

  async findOne(id) {
    const {
      rows: [product],
    } = await this.client.query(
      `
      select product.*, stocks.count from product
      join stocks on product.id = stocks.product_id
      where product.id = $1
    `,
      [id],
    );

    console.log('Returned product by id', product);

    return product;
  }
}

export const pgDatabaseService = new PgDatabaseService(client);
