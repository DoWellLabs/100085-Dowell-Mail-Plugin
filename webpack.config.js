const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: __dirname,
    filename: "./dist/bundle.js",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/react", "@babel/preset-env"],
          plugins: ["transform-class-properties"],
        },
      },
      {
        test: /\.(sass|less|css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
