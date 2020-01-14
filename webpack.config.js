var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./frontend/index.js",
  output: {
    path: path.join(__dirname, "frontend"),
    filename: "bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
        query: {
          presets: ["@babel/preset-env", "@babel/react"]
        }
      },
      {
        test: /.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};
