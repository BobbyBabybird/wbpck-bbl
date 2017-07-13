import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const htmlPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  title: 'My Title',
  template: './index.html',
  inject: 'body'
})

const extractTextPlugin = new ExtractTextWebpackPlugin({
  filename: 'main-[contenthash].css',
  disable: process.env.NODE_ENV !== 'production'
})

const cleanPlugin = new CleanWebpackPlugin(['dist'])

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1
  }
}

module.exports = {
  context: path.resolve(__dirname,'src'),
  entry: './index.js',
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [cssLoader]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          'loader': 'file-loader',
          'options': {
            'name': '[name]-[hash].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    htmlPlugin,
    cleanPlugin,
    extractTextPlugin
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  }
}
