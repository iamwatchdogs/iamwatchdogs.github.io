const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");

const config = require("./webpack.common");

module.exports = merge(config, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        include: path.resolve(__dirname, "..", "src", "styles", "main.css"),
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CleanWebpackPlugin(),
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
  infrastructureLogging: {
    appendOnly: true,
    level: "verbose",
  },
});
