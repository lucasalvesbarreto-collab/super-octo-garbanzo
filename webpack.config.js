const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: ["./js/app.js", "./js/menu.js"],
    cadastro: ["./js/validacao.js", "./js/menu.js"],
    projetos: ["./js/menu.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./html/index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "cadastro.html",
      template: "./html/cadastro.html",
      chunks: ["cadastro"]
    }),
    new HtmlWebpackPlugin({
      filename: "projetos.html",
      template: "./html/projetos.html",
      chunks: ["projetos"]
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "css", to: "css" },
        { from: "imagens", to: "imagens" }
      ]
    })
  ],
  devServer: {
    static: "dist",
    historyApiFallback: false,
    port: 8080
  }
};