const webpack = require('webpack');
const { baseOptions, getBanner } = require('./webpack.config.base');

module.exports = (env) => {
  baseOptions.output.filename = env.filename;
  baseOptions.plugins.push(
    new webpack.BannerPlugin({
      banner: getBanner({}),
      raw: true,
      entryOnly: true,
    }),
    new webpack.DefinePlugin({
      PRODUCTION: true,
    })
  );
  baseOptions.mode = 'production';

  return baseOptions;
};
