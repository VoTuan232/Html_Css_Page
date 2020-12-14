const merge = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const common = require("./webpack.common.js")();

const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env.production"),
});

const envVariables = dotenv.parsed;
const { NODE_ENV } = envVariables;

const devMode = NODE_ENV !== "production";
const plugins = [];
if (!devMode) {
  // enable in production only
  plugins.push(
    new MiniCssExtractPlugin({
      filename: "css/[name].build.css",
    })
  );
}

module.exports = merge(common, {
  mode: "production",
  plugins: [
    ...plugins,
    // new webpack.DefinePlugin({
    //   "process.envProduction": dotenv.parsed,
    // }),
  ],
  module: {
    rules: [
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
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
});
