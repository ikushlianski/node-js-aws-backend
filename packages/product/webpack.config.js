const path = require('path');
const glob = require('glob');
const baseConfig = require('../../webpack-base.config');

const entries = glob.sync('./handlers/*.js').reduce(
  (x, y) =>
    Object.assign(x, {
      [y]: y,
    }),
  {},
);

module.exports = {
  ...baseConfig,
  entry: {
    ...entries,
    'populate-products.js': './db/postgres/scripts/populate-products.js',
  },
  output: {
    ...baseConfig.output,
    path: path.join(__dirname, 'build'),
    filename: '[name]',
  },
};
