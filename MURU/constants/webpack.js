const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const baseUrl = "..";

module.exports = {
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "Development",
      template: "./src/login.html",
      chunks: ["vendor", "common", "login"],
      filename: "login.html",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        // include: path.resolve(__dirname, "./src/assets/images"),
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images/",
            // publicPath: "../images",
            // useRelativePaths: true,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        // include: path.resolve(__dirname, "./src/assets/fonts"),
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "fonts/",
            esModule: false,
            publicPath: "../fonts",
            useRelativePaths: true,
          },
        },
      },
    ],
  },
};
