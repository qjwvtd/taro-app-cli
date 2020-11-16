const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');

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
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  alias: {},//此处不配置,在webpackChain中自定义
  framework: 'react',
  mini: {
    //自定义 Webpack 配置。
    webpackChain:(chain, webpack) => {
      const eslintPlugin = new ESLintPlugin();
      const esLintLoader = {
        test: /\.(js|jsx)$/,
        use: [{
            loader: 'eslint-loader',
            options: { // 这里的配置项参数将会被传递到 eslint的CLIEngine
                formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
            }
        }],
        enforce: "pre", // 编译前检查
        include: resolve('src'),
        exclude: /node_modules/
      };
      const myResolve = {
        extensions: ['.js', '.jsx', '.css', '.scss', '.less'],
        alias: {
          '@': resolve('src')
        }
      };
      chain.merge({
        module: {
          rules: {'eslint-loader': esLintLoader}
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
