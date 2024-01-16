const common = require("../webpack.common");
const { merge } = require("webpack-merge");

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
      directory: __dirname,
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
