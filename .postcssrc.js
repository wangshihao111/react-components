module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {
      browsers: [
        'last 10 version',
        '> 10%',
        'maintained node versions',
        'not dead'
      ]
    }
  }
};
