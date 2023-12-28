const million = require("million/compiler");
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@component": path.resolve(__dirname, "src/component"),
    },
    plugins: {
      add: [million.webpack({ auto: true })],
    },
    configure: (config, { env }) => {
      // config.plugins.push();
      return config;
    },
  },
  babel: {
    plugins: [],
  },
};
