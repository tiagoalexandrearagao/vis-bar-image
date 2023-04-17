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

    resolve: {
      extensions: [".js"],
      modules: ["node_modules"],
    },
  };
  
  module.exports = webpackConfig;