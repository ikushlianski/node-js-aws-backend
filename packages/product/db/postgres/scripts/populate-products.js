import { Client } from 'pg';
import {
  createProductsTableQuery,
  createStockTableQuery,
  installExtensionsQuery,
} from './ddl';
import { populateProductsTableQuery, populateStockTableQuery } from './dml';
require('dotenv').config();

const connectToDB = async () => {
  const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  try {
    await client.connect();

    return client;
  } catch (e) {
    console.log('Error connecting to DB', e);

    process.exit(1);
  }
};

const createTables = async (client) => {
  await client.query(createProductsTableQuery);
  await client.query(createStockTableQuery);
};

const prepareDatabase = async (client) => {
  await client.query(installExtensionsQuery);
};

const populateTables = async (client) => {
  await client.query(populateProductsTableQuery);
  await client.query(populateStockTableQuery);
};

connectToDB()
  .then(async (client) => {
    await prepareDatabase(client);
    await createTables(client);
    console.log('Created product tables');

    await populateTables(client);
    console.log('Populated product tables');
  })
  .catch((error) => {
    console.log('Error populating database', error);
  })
  .finally(() => {
    process.exit();
  });
