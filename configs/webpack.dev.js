const common = require("../webpack.common");
const { merge } = require("webpack-merge");
const path = require('path');

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '..'),
      watch: true,
    },
    client: {
      logging: "info",
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    client: {
      progress: true,
    },
    compress: true,
    open: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  devtool: "source-map",
});
