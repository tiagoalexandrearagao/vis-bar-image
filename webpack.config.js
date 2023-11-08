var path = require("path");
module.exports = (env) => {
  console.log(env);
  return {
    mode: "production",
    node: {
      fs: "empty",
    },
    entry: env.input,
    devServer: {
      contentBase: "./dist",
      https: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
    output: {
      filename: env.output,
      path: path.resolve(__dirname, "dist"),
      library: env.name,
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
};

//module.exports = webpackConfig;
