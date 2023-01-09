const { resolve } = require('path');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const commonMeta = require('./common.meta.json');

const year = new Date().getFullYear();
const getBanner = (meta) => `// ==UserScript==\n${Object.entries(Object.assign(commonMeta, meta))
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return value.map((item) => `// @${key.padEnd(20, ' ')}${item}`).join('\n');
    }
    return `// @${key.padEnd(20, ' ')}${value.replace(/\[year\]/g, year)}`;
  })
  .join('\n')}
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]`;

const relativePath = (p) => path.join(process.cwd(), p);
const src = relativePath('src');

const baseOptions = {
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, '../dist'),
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 预设：指示babel做怎么样的兼容性处理。
              presets: [
                [
                  '@babel/preset-env',
                  {
                    corejs: {
                      version: 3,
                    }, // 按需加载
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: [src],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /node_modules/,
      },
      {
        test: /\.css$/,
        // 使用哪些 loader 进行处理
        use: [
          // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行
          // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
          'style-loader',
          'css-loader',
          // 'to-string-loader',
          // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
          // GM_addStyle 不需要 style-loader
          // esModule: false 时可以 toString() 后使用 GM_addStyle 插入 css
          // {
          //   loader: 'css-loader',
          //   options: {
          //     esModule: false,
          //   },
          // },
        ],
        include: [src],
      },
      {
        test: /\.less$/,
        // 使用哪些 loader 进行处理
        use: [
          // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行
          // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
          'style-loader',
          // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: /==\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
          },
        },
        extractComments: false,
      }),
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@': src,
    },
  },
  plugins: [],
};

module.exports = {
  getBanner,
  baseOptions,
};
