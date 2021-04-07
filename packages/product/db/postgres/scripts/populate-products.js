import { Client } from 'pg';
import { createProductsTableQuery, createStockTableQuery } from './ddl';
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

// const populateTables = async (client) => {
//   await client.query(populateProductsTable);
//   await client.query(populateStockTable);
// };

connectToDB().then(async (client) => {
  await createTables(client);
  console.log('Created product tables');
  // await populateTables(client);
  // console.log('Populated product tables');
});
