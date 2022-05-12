module.exports = {
  lintOnSave: false,
  css: { extract: false },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/v-craft/'
    : '/',
  chainWebpack: (config) => {
    // When the argument `--target` is 'lib'
    if (process.argv[4] === 'lib') {
      config.externals([
        'lodash/kebabCase',
        'lodash/cloneDeep',
        'uuid',
      ]);
    }
  },
  devServer: {
    proxy: {
      "/": {
          "target": "http://localhost:3000",
      }
    }
  },
};
