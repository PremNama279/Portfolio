const path = require('path');

module.exports = function override(config, env) {
  // Add any custom webpack configuration here
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify")
    }
  };

  return config;
}; 