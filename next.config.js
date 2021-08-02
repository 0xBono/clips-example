const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  pwa: {
    disable: true,
    dest: 'public',
  },
  distDir: '.next',
  webpack(config, options) {
    const { dev, isServer } = options;
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }
    return config;
  },
  trailingSlash: true,
};
