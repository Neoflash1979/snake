const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonConfig = {
    devServer: {
        contentBase: './dist'
      },
    devtool: 'inline-source-map',
    module: {
        rules: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
      },
      node: {
        __dirname: false
      }
}

const mainConfig = Object.assign({
  entry: { main: './src/main.ts' },
  plugins: [new CleanWebpackPlugin(['dist'])],  
  target: 'electron-main'  
},
commonConfig);

const rendererConfig = Object.assign({
  entry: { renderer: './src/renderer.ts' },
  plugins: [    
    new HtmlWebpackPlugin({
      hash: true,
      title: 'My Awesome application',
      myPageHeader: 'Hello World',
      template: './src/index.html'
    })
  ],
  target: 'electron-renderer'  
},
commonConfig);

module.exports = [mainConfig, rendererConfig];
