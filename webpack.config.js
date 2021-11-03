module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/assets/js',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /(node_modules|public)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
