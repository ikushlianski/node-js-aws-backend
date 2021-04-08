export const populateProductsTableQuery = `
  INSERT INTO public.product (id, title, description, price)
  VALUES (
    '5966d22a-69a2-439e-aa4c-54c041ba7908',
    'Classic tour of Minsk',
    'Explore all the most important sights',
    25
  ),
  (
    '636156b0-2745-431d-a974-f14bdfa4cb3e',
    'Modern Minsk tour',
    'See how Minsk has left Soviet legacy behind and stepped into the future',
    20
  ),
  (
    '2254b35f-8570-4fcf-aa08-f1f4708e04b3',
    'Alternative Minsk tour',
    'For those who want something off the beaten track',
    15
  ),
  (
    'eeaf9772-f6b2-4896-b569-3f5a2b30dc4d',
    'Minsk and Soviet heritage',
    'Let us face it: Minsk still resembles a classic Soviet-era city. Explore the past today!',
    24
  ),
  (
    '3c554321-b3f8-49bf-85db-ea11aa1ddbea',
    'Famous people of Minsk',
    'Did you know that lots of world-famous people were born or lived in Minsk? You will be surprised!',
    16
  )
`;

export const populateStockTableQuery = `
  INSERT INTO public.stocks (product_id, count)
  VALUES (
    '5966d22a-69a2-439e-aa4c-54c041ba7908',
    3
  ),
  (
    '636156b0-2745-431d-a974-f14bdfa4cb3e',
    12
  ),
  (
    '2254b35f-8570-4fcf-aa08-f1f4708e04b3',
    8
  ),
  (
    'eeaf9772-f6b2-4896-b569-3f5a2b30dc4d',
    4
  ),
  (
    '3c554321-b3f8-49bf-85db-ea11aa1ddbea',
    6
  )
`;
