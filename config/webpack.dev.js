const path = require("path");
const { merge } = require("webpack-merge");

const config = require("./webpack.common");

module.exports = merge(config, {
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        include: path.resolve(__dirname, "..", "src", "styles", "main.css"),
      },
    ],
  },
  plugins: [],
  devtool: "inline-source-map",
  devServer: {
    static: "/dist",
    hot: true,
    open: true,
    port: 3000,
  },
  optimization: {
    runtimeChunk: true,
  },
});
