const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackConfig = {
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

const { plugins: pluginDefault, module: moduleConfig } = webpackConfig;
const { rules: rulesConfig } = moduleConfig;

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  // console.log("NODE_ENV: ", env.NODE_ENV); // 'local'
  // console.log("Production: ", env.production); // true
  return {
    mode: "development",
    entry: {
      common: "./src/js/common.js",
      login: "./src/js/login.js",
      vendor: "./src/vendor/vendor.js",
      // css: path.resolve(process.cwd(), "src", "css.js"),
    },
    plugins: [...pluginDefault],
    output: {
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [...rulesConfig],
    },
    resolve: {
      alias: {
        fonts: path.resolve(__dirname, "src/assets/fonts"),
        images: path.resolve(__dirname, "src/assets/images"),
      },
    },
    devServer: {
      port: 9001,
    },
  };
};
