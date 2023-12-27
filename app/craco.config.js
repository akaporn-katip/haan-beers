const million = require("million/compiler");
const path = require("path");
const StyleXBabelPlugin = require("@stylexjs/babel-plugin");
const StyleXWebpackPlugin = require("@stylexjs/webpack-plugin");

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
      config.plugins.push(
        new StyleXWebpackPlugin({
          filename: "styles.[contenthash].css",
          // get webpack mode and set value for dev
          dev: env === "development",
          // Use statically generated CSS files and not runtime injected CSS.
          // Even in development.
          runtimeInjection: false,
          // optional. default: 'x'
          classNamePrefix: "x",
          // Required for CSS variable support
          unstable_moduleResolution: {
            // type: 'commonJS' | 'haste'
            // default: 'commonJS'
            type: "commonJS",
            // The absolute path to the root directory of your project
            rootDir: __dirname,
          },
        })
      );
      return config;
    },
  },
  babel: {
    plugins: [
      [
        StyleXBabelPlugin,
        {
          dev: true,
          // Set this to true for snapshot testing
          // default: false
          test: false,
          // Required for CSS variable support
          unstable_moduleResolution: {
            // type: 'commonJS' | 'haste'
            // default: 'commonJS'
            type: "commonJS",
            // The absolute path to the root directory of your project
            rootDir: __dirname,
          },
        },
      ],
    ],
  },
};
