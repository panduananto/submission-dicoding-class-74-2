const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkBoxPlugin = require("workbox-webpack-plugin");
const PWAManifestPlugin = require("webpack-pwa-manifest");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    standings: "./src/js/standings.js",
    teams: "./src/js/teams.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "images/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/standings.html",
      filename: "./standings.html",
      chunks: ["standings"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/teams.html",
      filename: "./teams.html",
      chunks: ["teams"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/pages/", to: "pages/" },
        { from: "./src/icons/", to: "icons/" },
        { from: "./src/images/", to: "images/" },
        "./src/nav.html",
        "./src/push.js",
      ],
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
    new WorkBoxPlugin.InjectManifest({
      swSrc: "./src/service-worker.js",
      swDest: "service-worker.js",
    }),
    new PWAManifestPlugin({
      name: "Soccer101",
      short_name: "Soccer101",
      gcm_sender_id: "307910579934",
      theme_color: "#651fff",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: path.resolve("src/icons/icon-512x512.png"),
          sizes: [72, 96, 128, 192, 144, 152, 192, 256, 384, 512],
          destination: path.join("icons"),
        },
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve("src/icons/icon-512x512.png"),
      favicons: {
        gcm_sender_id: "307910579934",
        appName: "Soccer101",
        appShortName: "Soccer101",
        appDescription: "Soccer 101",
        theme_color: "#651fff",
        background: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: {
          android: true,
          appleIcon: true,
          favicons: true,
        },
      },
    }),
  ],
};
