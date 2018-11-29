const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

/*
  Here we have used some Webpack 4 goodness that allows the config file to export a function 
  which takes argv as a param. argv has a property mode which tells you what mode flag the 
  webpack command was called with (development or production) from the CLI. 
*/
module.exports = (env, argv) => {
  const SERVER_PATH =
    argv.mode === "production"
      ? "./src/server/server-prod.js"
      : "./src/server/server-dev.js";

  return {
    entry: {
      server: SERVER_PATH
    },
    output: {
      path: path.join(__dirname, "dist"),
      publicPath: "/",
      filename: "[name].js"
    },
    target: "node",
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  };
};
