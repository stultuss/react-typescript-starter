import webpackNodeExternals from 'webpack-node-externals';
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';

import config from '../config/index';

const debug = require('debug')('app:webpack:config');
const paths = config.utils_paths;
const {__ENV__} = config.globals;

debug(`创建 SSR 编译配置, 环境: ${__ENV__}, 版本号: ${config.version}`);

// ========================================================
// Webpack 默认配置
// ========================================================
const webpackConfig = {
  mode: 'production',
  target: 'node',
  externals: [webpackNodeExternals(), /api/],
  devtool: 'source-map',
  entry: {},
  output: {},
  plugins: [],
  optimization: {},
  module: {
    rules: []
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
  }
};

// ------------------------------------
// Entry Points
// ------------------------------------
webpackConfig.entry = {
  ssr: paths.src('ssr.tsx')
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: '[name].js',
  path: paths.dist(),
  libraryTarget: 'commonjs2' // 支持其他 js 调用
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  // 由于使用 babel-loader 替换了 ts-loader，所以 Babel 不会检查代码，此处需要额外添加 TsChecker 作为构建过程的一部分。
  new ForkTsCheckerPlugin(),
];

// ------------------------------------
// Optimization
// ------------------------------------
webpackConfig.optimization = {
  minimize: false, // 开启代码压缩
};

// ------------------------------------
// Modules - TypeScript Loaders
// ------------------------------------
// TypeScript / JSON
webpackConfig.module.rules = [
  {
    test: /\.json$/,
    use: 'json-loader'
  },
  {
    test: /\.(ts|tsx|js|jsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              {targets: {browsers: 'last 2 versions'}} // or whatever your project requires
            ],
            '@babel/preset-typescript',
            '@babel/preset-react'
          ],
          plugins: [
            // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-proposal-decorators', {legacy: true}],
            ['@babel/plugin-proposal-class-properties', {loose: true}]
          ]
        }
      }
    ],
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          // limit: 4096, // 4k 以下的图片，都进行 base64
          limit: 1024, // 4k 以下的图片，都进行 base64
          name: `assets_${config.version}/img/[name].[hash:8].[ext]`, // 这里没有 chunkhash 的计算
        }
      }
    ]
  }
];

// ------------------------------------
// Modules - Style Loaders
// ------------------------------------
// 默认的 CSS_LOADER 配置
const BASE_CSS_LOADER_USE = [];

// CSS-loader
BASE_CSS_LOADER_USE.push({
  loader: 'css-loader',
  options: {
    modules: false,
    importLoaders: 1,
    minimize: false,  // 将使用 postcss 和 cssnano 进行最小化，所以此处不需要重复最小化
  }
});

// PostCSS-loader
BASE_CSS_LOADER_USE.push({
  loader: 'postcss-loader',
  options: {
    plugins: (loader) => [
      require('postcss-import')({root: loader.resourcePath}),
      require('autoprefixer')(), // CSS浏览器兼容
      require('cssnano')()  // 压缩css
    ]
  }
});

// CSS-Loader
webpackConfig.module.rules.push({
  test: /\.css$/,
  use: BASE_CSS_LOADER_USE,
});

// SCSS-loader
webpackConfig.module.rules.push({
  test: /\.scss$/,
  use: BASE_CSS_LOADER_USE.concat([
    {
      loader: 'sass-loader'
    }
  ]),
});

// 合并 webpack 配置
export default webpackConfig;