export const createProductsTable = `
  CREATE TABLE public.product (
	id uuid NOT NULL,
	title text NOT NULL,
	description text NULL,
	price int NULL,
	CONSTRAINT product_pk PRIMARY KEY (id)
);
`;
