const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/debounce.js",
    "./js/backend.js",
    "./js/miniatures-render.js",
    "./js/miniatures-order.js",
    "./js/miniatures.js",
    "./js/form-effect.js",
    "./js/form-scale.js",
    "./js/form-submit.js",
    "./js/form.js",
    "./js/hashtag-check.js",
    "./js/big-picture.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
