const path = require("path");

module.exports = {
  target: "webworker",
  mode: "production",
  entry: "./src/worker.ts",
  output: {
    filename: `worker.js`,
    path: path.join(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js"],
    alias: {
      fs: path.resolve(__dirname, "./null.js"), // module.exports = {}
      busboy: path.resolve(__dirname, "./null.js"),
      "apollo-server": "apollo-server-cloudflare"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  optimization: {
    usedExports: true
  }
};
