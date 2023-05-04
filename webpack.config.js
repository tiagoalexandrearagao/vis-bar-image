var webpackConfig = {
  mode: "production",
  entry: {
    charts: "./src/charts.js",
  },
  devServer: {
    contentBase: './dist', 
    https: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  },
  output: {
    filename: "./docs/public/[name].js",
    path: __dirname,
    library: "[name]",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        loader: "url-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    modules: ["node_modules"],
  },
};

module.exports = webpackConfig;