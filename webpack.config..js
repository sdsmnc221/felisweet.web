// webpack.config.js
module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
}
