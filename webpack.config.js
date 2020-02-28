const path = require("path");

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
  devServer: {
    contentBase: "./public",
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true,
  },
};