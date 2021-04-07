export const createProductsTableQuery = `
  CREATE TABLE public.product (
	  id uuid NOT NULL,
	  title text NOT NULL,
	  description text NULL,
	  price int NULL,
	  CONSTRAINT product_pk PRIMARY KEY (id)
  );
`;

export const createStockTableQuery = `
  CREATE TABLE public.stocks (
	  product_id uuid,
	  count int DEFAULT 0,
	  CONSTRAINT product_id_fk
	  FOREIGN KEY (product_id) REFERENCES public.product(id)
  );
`;
