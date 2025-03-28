const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  entry: path.resolve(__dirname, "..", "src", "scripts", "main.js"),
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "[name].bundle.js",
    clean: true,
    iife: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "src", "index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "..", "src", "assets", "img"),
          to: "assets/img",
        },
      ],
    }),
    new WebpackManifestPlugin({
      publicPath: "/",
    }),
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "..", "src"),
    },
  },
};
