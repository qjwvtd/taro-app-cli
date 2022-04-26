const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const {esLintLoader, cssLoader, lessLoader} = require('./loader');

function resolve(name) {
  return path.resolve(__dirname, '..', name);
}
const config = {
  projectName: 'taro-app-cli',
  date: '2020-11-13',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    'babel-plugin-transform-decorators-legacy'
  ],
  defineConstants: {},
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  alias: {
    '@': resolve('src')
  },
  framework: 'react',
  mini: {
    //自定义 Webpack 配置。
    webpackChain:(chain, webpack) => {
      const eslintPlugin = new ESLintPlugin();
      const myResolve = {
        extensions: ['.js', '.jsx', '.css', '.scss', '.less']
      };
      chain.merge({
        module: {
          rules: [esLintLoader,cssLoader,lessLoader]
        },
        resolve: myResolve,
        plugins: [eslintPlugin]
      })
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
