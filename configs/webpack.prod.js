const common = require("../webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /node_modules/,
        parallel: true,
      }),
      new CssMinimizerPlugin({
        test: /\.css(\?.*)?$/i,
        exclude: /node_modules/,
        parallel: true,
      }),
      new HtmlMinimizerPlugin({
        test: /\.html(\?.*)?$/i,
        exclude: /node_modules/,
        parallel: true,
        minimizerOptions: {
          collapseWhitespace: false,
        },
      }),
    ],
  },
});
