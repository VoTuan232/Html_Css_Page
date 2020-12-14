const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const envVariables = process.env;
const { NODE_ENV } = envVariables;

const devMode = NODE_ENV !== "production";
const plugins = [];
if (!devMode) {
  // enable in production only
  plugins.push(
    new MiniCssExtractPlugin({
      filename: "css/[name].build.css",
      // chunkFilename: path.resolve(__dirname, "dist/css"),
    })
  );
}

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
    plugins: [
      ...plugins,
      // ...{env.NODE_ENV === "production"
      // ? new MiniCssExtractPlugin({
      //     filename: "[name].build.css",
      //   })
      // : {}},
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
      new webpack.DefinePlugin({
        "process.env": dotenv.parsed,
      }),
    ],
    output: {
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: ["html-loader"],
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "imgs",
            },
          },
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "fonts",
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode
              ? "style-loader"
              : {
                  loader: MiniCssExtractPlugin.loader,
                },
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        // {
        //   test: /\.scss$/,
        //   use: [
        //     "style-loader", // inject CSS to page
        //     "css-loader", // translates CSS into CommonJS modules
        //     "sass-loader", // compiles Sass to CSS
        //   ],
        // },
        // {
        //   test: /\.css$/i,
        //   use: [MiniCssExtractPlugin.loader, "css-loader"],
        // },
      ],
    },
    devServer: {
      port: 9001,
    },
  };
};
