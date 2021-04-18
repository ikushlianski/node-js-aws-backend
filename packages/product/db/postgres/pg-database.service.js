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

  async create(product) {
    console.log('About to write product data into DB');
    console.dir(product); // inspect product properties

    const { title, description, price, count } = JSON.parse(product);

    console.log('title', title);

    try {
      await client.query('BEGIN');

      const {
        rows: [{ id }],
      } = await client.query(
        `insert into public.product(title, description, price) VALUES($1, $2, $3) RETURNING id`,
        [title, description, price],
      );

      console.log('Created a product with id', id);

      await client.query(
        `insert into public.stocks(product_id, count) VALUES($1, $2)`,
        [id, count],
      );

      console.log(`Inserted count ${count} for product ${id}`);

      await client.query('COMMIT');

      return id;
    } catch (e) {
      await client.query('ROLLBACK');

      throw e;
    }
  }
}

export const pgDatabaseService = new PgDatabaseService(client);
