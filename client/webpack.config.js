const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development", //include src files in dev tools for faster developement
    entry: {
      main: "./src/js/index.js", // file created in dist directory
      install: "./src/js/install.js", // file created in dist directory
    },
    output: {
      filename: "[name].bundle.js", // name of the compressed file with the code that goes into dist directory
      path: path.resolve(__dirname, "dist"), // Creates distribution directory that holds bundle.js and appropriate files
    },
    plugins: [
      new HtmlWebpackPlugin({
        // inserts html file into dist directory
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      // inserts workbox service worker into dist directory
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "./dist/sw.js",
      }),

      // Creates a manifest.json file.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Text Editor",
        short_name: "Text",
        description: "PWA Text Editor",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      // TODO: Add CSS loaders and babel to webpack.
      rules: [
        {
          test: /\.css$/i, //regex that finds css files?
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
