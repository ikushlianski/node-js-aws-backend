import { Client } from 'pg';
import { createProductsTable } from './ddl';

const connectToDB = async () => {
  const client = new Client();

  try {
    await client.connect();

    return client;
  } catch (e) {
    console.log('Error connecting to DB', e);

    process.exit(1);
  }
};

const createTables = async (client) => {
  await client.query(createProductsTable);
  await client.query(createStockTable);
};

const populateTables = async (client) => {
  await client.query(populateProductsTable);
  await client.query(populateStockTable);
};

connectToDB().then(async (client) => {
  await createTables(client);
  await populateTables(client);
});
