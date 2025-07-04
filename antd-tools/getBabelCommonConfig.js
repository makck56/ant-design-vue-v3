const { resolve } = require('./utils/projectHelper');

module.exports = function (modules, pluginsOnly = false) {
  const plugins = [
    [
      resolve('@babel/plugin-transform-typescript'),
      {
        isTSX: true,
      },
    ],
    [resolve('@vue/babel-plugin-jsx'), { mergeProps: false, enableObjectSlots: false }],
    resolve('@babel/plugin-proposal-optional-chaining'),
    resolve('@babel/plugin-transform-object-assign'),
    resolve('@babel/plugin-proposal-object-rest-spread'),
    resolve('@babel/plugin-proposal-export-default-from'),
    // resolve('@babel/plugin-proposal-export-namespace-from'),
    // resolve('@babel/plugin-proposal-class-properties'),
    resolve('@babel/plugin-syntax-dynamic-import'),
    [
      resolve('@babel/plugin-transform-runtime'),
      {
        useESModules: modules === false,
        version: '^7.10.4',
      },
    ],
    // resolve('babel-plugin-inline-import-data-uri'),
    // resolve('@babel/plugin-transform-member-expression-literals'),
    // resolve('@babel/plugin-transform-property-literals'),
    // resolve('@babel/plugin-proposal-export-default-from'),
    // resolve('@babel/plugin-transform-object-assign'),
    // resolve('@babel/plugin-transform-template-literals'),
    // resolve('@babel/plugin-proposal-object-rest-spread'),
    // resolve('@babel/plugin-proposal-class-properties'),
  ];

  const config = {
    plugins,
    env: {
      test: {
        plugins: [resolve('babel-plugin-istanbul')],
      },
    },
  };

  if (pluginsOnly) {
    return config;
  }

  config.presets = [
    [
      resolve('@babel/preset-env'),
      {
        modules,
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'not ie 11'],
        },
      },
    ],
  ];

  return config;
};
