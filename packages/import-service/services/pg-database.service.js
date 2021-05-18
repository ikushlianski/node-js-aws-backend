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

  async create(product) {
    const { title, description, price, count } = JSON.parse(product);

    console.log('Writing to DB this title:', title);

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
