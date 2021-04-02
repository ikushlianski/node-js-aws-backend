class Product {
  constructor({ id, title, description, price }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

// tours of Minsk
export const products = [
  new Product({
    id: 1,
    title: 'Classic tour of Minsk',
    description: 'Explore all the most important sights',
    price: 25,
  }),
  new Product({
    id: 2,
    title: 'Modern Minsk tour',
    description:
      'See how Minsk has left Soviet legacy behind and stepped into the future',
    price: 20,
  }),
  new Product({
    id: 3,
    title: 'Alternative Minsk tour',
    description: 'For those who want something off the beaten track',
    price: 15,
  }),
  new Product({
    id: 4,
    title: 'Minsk and Soviet heritage',
    description:
      'Let us face it: Minsk still resembles a classic Soviet-era city. Explore the past today!',
    price: 24,
  }),
  new Product({
    id: 5,
    title: 'Famous people of Minsk',
    description:
      'Did you know that lots of world-famous people were born or lived in Minsk? You will be surprised!',
    price: 16,
  }),
];
