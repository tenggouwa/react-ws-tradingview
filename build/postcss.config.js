module.exports = {
  // parser: 'sugarss',
  // sourceMap: true,
  ident: 'postcss',
  // happypack 只接受纯对象，所以改成这样子
  plugins: {
      'autoprefixer': {
          browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
          ]
      }
  }
}
