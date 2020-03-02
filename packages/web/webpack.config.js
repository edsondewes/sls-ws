const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../public", "js"),
    publicPath: "/js/",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __WS_URL__: JSON.stringify("ws://localhost:3001"),
    }),
  ],
  devServer: {
    contentBase: "./public",
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true,
  },
};
