var webpackConfig = {
    mode: "production",
    entry: {
      bar_image: "./src/bar_image.js",
    },
    output: {
      filename: "[name].js",
      path: __dirname,
      library: "[name]",
      libraryTarget: "umd",
    },
    module: {
      rules: [
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[local]",
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },       
      ],
    },
    resolve: {
      extensions: [".js"],
      modules: ["node_modules"],
    },
  };  
  module.exports = webpackConfig;