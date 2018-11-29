/**
 * Environment variables used in this configuration:
 * NODE_ENV
 *
 */
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

/**
 * flag Used to check if the environment is production or not
 */
// const isProduction = process.env.NODE_ENV === "production";
// const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  // !!! IMPORTANT !!!
  target: "web",
  devtool: "#source-map",
  // Webpack 4 does not have a CSS minifier, although
  // Webpack 5 will likely come with one
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
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
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        // Loads images into CSS and Javascript files
        test: /\.(png|svg|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader"
            // options: {
            //   limit: 8192
            // }
          }
        ]
      },
      {
        // Loads CSS into a file when you import it via Javascript
        // Rules are set in MiniCssExtractPlugin
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false, sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
        // use: [
        //   devMode ? "style-loader" : MiniCssExtractPlugin.loader,
        //   // { loader: "style-loader" },
        //   { loader: "css-loader", options: { url: false, sourceMap: true } },
        //   { loader: "sass-loader", options: { sourceMap: true } }
        // ]
      }
    ]
    // resolve: {
    //   extensions: ["", ".js", ".jsx", ".css"],
    //   modulesDirectories: ["node_modules"]
    // }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      excludeChunks: ["server"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
