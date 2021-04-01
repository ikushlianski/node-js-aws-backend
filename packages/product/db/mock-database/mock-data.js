class Product {
  constructor({ id, name, description }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

// tours of Minsk
export const products = [
  new Product({
    id: 1,
    name: 'Classic tour of Minsk',
    description: 'Explore all the most important sights',
  }),
  new Product({
    id: 2,
    name: 'Modern Minsk tour',
    description:
      'See how Minsk has left Soviet legacy behind and stepped into the future',
  }),
  new Product({
    id: 3,
    name: 'Alternative Minsk tour',
    description: 'For those who want something off the beaten track',
  }),
  new Product({
    id: 4,
    name: 'Minsk and Soviet heritage',
    description:
      'Let us face it: Minsk still resembles a classic Soviet-era city. Explore the past today!',
  }),
  new Product({
    id: 5,
    name: 'Famous people of Minsk',
    description:
      'Did you know that lots of world-famous people were born or lived in Minsk? You will be surprised!',
  }),
];
