export const createProductsTableQuery = `
  CREATE TABLE IF NOT EXISTS public.product (
	  id uuid NOT NULL DEFAULT uuid_generate_v4(),
	  title text NOT NULL,
	  description text NULL,
	  price int NULL,
	  CONSTRAINT product_pk PRIMARY KEY (id)
  );
`;

export const createStockTableQuery = `
  CREATE TABLE IF NOT EXISTS public.stocks (
	  product_id uuid,
	  count int DEFAULT 0,
	  CONSTRAINT product_id_fk
	  FOREIGN KEY (product_id) REFERENCES public.product(id)
  );
`;

export const installExtensionsQuery = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
