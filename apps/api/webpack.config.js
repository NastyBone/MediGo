const { composePlugins, withNx } = require('@nrwl/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const join = require('path').join;
// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.plugins = [
    ...config.plugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(__dirname, '..', '..', 'node_modules/tslib'),
          to: 'tslib',
        },
      ],
    }),
  ];
  return config;
});
