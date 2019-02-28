const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {
  const challengeNum = env.challengeNum.toString();
  return {
    entry: `./challenge${challengeNum}/src/js/index.js`,
    output: {
      path: path.resolve(__dirname, `challenge${challengeNum}/dist`),
      filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader" 
        },
        {
          test: /\.scss$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader", options: {
                  sourceMap: true
              }
          }, {
              loader: "sass-loader", 
              options: {
                  sourceMap: true,
                  includePaths: []
              }
          }]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([`challenge${challengeNum}/dist`]),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: path.join(__dirname, `challenge${challengeNum}/dist`),
      compress: true,
      port: 8000,
      hot: true
    }
  }
};