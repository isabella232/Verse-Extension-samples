const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/javascripts/index.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: [
              ['react-intl', {messagesDir: './build/'}]
            ]
          }
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: 'svg-react-loader'
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/assets/',
    historyApiFallback: {
      rewrites: [
        {from: /^\/$/, to: '/namepicker.html'}
      ]
    }
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
}
