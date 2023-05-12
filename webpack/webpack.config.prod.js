const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'production', 
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i, //MiniCssExtractPlugin.loader zamiast "style-loader"
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
           // Creates `style` nodes from JS strings (plugin instead of "style-loader")
            // loader: MiniCssExtractPlugin.loader,
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            // Translates CSS into CommonJS
            loader: 'css-loader',
            options: {}
          },
          {
            // Compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), // Prefer `dart-sass`
            },
          },
          {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            "autoprefixer",
                        ],
                    ],
                },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "../css_webpack/[name].min.css",
    }),
  ]
};