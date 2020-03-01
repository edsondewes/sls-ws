const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => {
  return {
    mode: "production",
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "./dist", "js"),
      publicPath: "/js/"
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: ["babel-loader"],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      //new webpack.DefinePlugin({
      //  __API_URL__: JSON.stringify(env.API_URL)
      //}),
      new CopyWebpackPlugin([{ from: "./public", to: "../" }])
    ]
  };
};
