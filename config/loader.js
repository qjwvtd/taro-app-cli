const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve(name) {
  return path.resolve(__dirname, '..', name);
}
export const esLintLoader = {
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
export const cssLoader = {
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        { loader: 'style-loader' },
        { loader: 'css-loader' }
    ],
    include: resolve('src'),
    exclude: /node_modules/
};
export const lessLoader = {
    test: /\.less$/,
    use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }, // translates CSS into CommonJS
        {
            loader: 'less-loader', // compiles Less to CSS
            options: {
                modifyVars: {
                    // 'primary-color': '#1DA57A'
                    // or
                    // 'hack': `true; @import "your-less-file-path.less";`,
                },
                javascriptEnabled: true,
            }
        }
    ],
    include: resolve('src'),
    exclude: /node_modules/
};