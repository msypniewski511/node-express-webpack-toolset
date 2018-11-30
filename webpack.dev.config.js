/**
 * Environment variables used in this configuration:
 * NODE_ENV
 *
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

/**
 * flag Used to check if the environment is production or not
 */
const isProduction = process.env.NODE_ENV === "production";
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    main: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./src/index.js"
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
    hotUpdateChunkFilename: ".hot/[id].[hash].hot-update.js",
    hotUpdateMainFilename: ".hot/[hash].hot-update.json"
  },
  mode: "development",
  // !!! IMPORTANT !!!
  target: "web",
  devtool: "#source-map",
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
          // options: {
          //   presets: ["env", "es2015"]
          // }
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader"
            // options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          // { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
    // resolve: {
    //   extensions: ["", ".js", ".jsx", ".css"],
    //   modulesDirectories: ["node_modules"]
    // }
  },
  plugins: [
    new HtmlWebPackPlugin({
      stats: { children: false },
      template: "./src/html/index.html",
      filename: "./index.html",
      // template: "./src/html/index.html",
      excludeChunks: ["server"]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
