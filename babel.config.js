module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { node: 'current' },
      modules: 'commonjs'
    }],
  ],
  plugins: [
    '@babel/plugin-transform-class-properties'
  ],
  parserOpts: {
    plugins: ['classProperties', 'classPrivateProperties', 'classPrivateMethods']
  }
};