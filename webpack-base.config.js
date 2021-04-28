const webpack = require('webpack');

module.exports = {
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: 14,
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  mode: process.env.NODE_ENV || 'production',
  output: {
    libraryTarget: 'commonjs2',
    clean: true,
  },
  plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
};
