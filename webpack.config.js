import webpackMerge from 'webpack-merge';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';

import config from './config';

const debug = require('debug')('app:webpack:config');
const paths = config.utils_paths;
const {__ENV__, __DEBUG__} = config.globals;

debug(`创建编译配置, 环境: ${__ENV__}, 版本号: ${config.version}`);

// ========================================================
// Webpack 默认配置
// ========================================================
const webpackConfig = {
  mode: 'development',
  target: 'web',
  entry: {},
  output: {},
  plugins: [],
  optimization: {},
  module: {
    rules: [],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },
};

// ------------------------------------
// Entry Points
// ------------------------------------
webpackConfig.entry = {
  main: [
    '@babel/polyfill',
    paths.src('index.tsx'),
  ],
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: '[name].js',
  path: paths.dist(),
  publicPath: '/',
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  // 以 index.html 为模版，将打包的文件名插入到模版中
  new HtmlWebpackPlugin({
    template: paths.src('index.html'),
    hash: false,
    filename: config.compiler_html_filename,
    inject: 'body',
    minify: {
      collapseWhitespace: true,
    },
  }),
  // 将 runtime 代码块直接插入到 html 中，避免1次请求，方便文件的持久化缓存
  new InlineManifestWebpackPlugin('runtime'),
];

// 是否打开静态源码分析
if (config.bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

// ------------------------------------
// Optimization
// ------------------------------------
webpackConfig.optimization = {
  // 将所有 chunk 的运行代码打包到一个文件中
  runtimeChunk: 'single',
  // 代码分割，尽量使用默认的配置，目前作用于`异步加载`
  splitChunks: {
    cacheGroups: {
      // 将 node_modules 的模块分离出来
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        minSize: 30000,
        minChunks: 1,
        chunks: 'initial',
        priority: 1, // 该配置项是设置处理的优先级，数值越大越优先处理
      },
      // 将s rc/common 中的公用代码分离出来
      commons: {
        test: /[\\/]src[\\/]common[\\/]/,
        name: 'commons',
        minSize: 30000,
        minChunks: 3,
        chunks: 'initial',
        priority: -1,
        reuseExistingChunk: true, // 这个配置允许我们使用已经存在的代码块
      },
    },
  },
};

// ------------------------------------
// Modules - TypeScript Loaders
// ------------------------------------
const BABEL_LOADER_PLUGINS = [
  // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-decorators', {legacy: true}],
  ['@babel/plugin-proposal-class-properties', {loose: true}],
];

if (__DEBUG__) {
  BABEL_LOADER_PLUGINS.push('react-hot-loader/babel');
}

// TypeScript / JSON
webpackConfig.module.rules = [
  {
    test: /\.json$/,
    use: 'json-loader',
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
              {targets: {browsers: 'last 2 versions'}}, // or whatever your project requires
            ],
            '@babel/preset-typescript',
            '@babel/preset-react',
          ],
          plugins: BABEL_LOADER_PLUGINS,
        },
      },
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
        },
      },
    ],
  },
];

// ------------------------------------
// Modules - Style Loaders
// ------------------------------------
// 默认的 CSS_LOADER 配置
const BASE_CSS_LOADER_USE = ['style-loader'];

if (!__DEBUG__) {
  // 由于使用 babel-loader 替换了 ts-loader，所以 Babel 不会检查代码，此处需要额外添加 TsChecker 作为构建过程的一部分。
  webpackConfig.plugins.push(new ForkTsCheckerPlugin());
  // 生产环境下比较推荐的做法是，使用 MiniCssExtractPlugin 将样式表抽离成专门的单独文件
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `assets_${config.version}/[name].[chunkhash:8].css`,
      chunkFilename: `assets_${config.version}/[name].[chunkhash:8].css`,
    }),
  );
  BASE_CSS_LOADER_USE.push(MiniCssExtractPlugin.loader);
}

// CSS-loader
BASE_CSS_LOADER_USE.push({
  loader: 'css-loader',
  options: {
    modules: false,
    importLoaders: 1,
    minimize: false,  // 将使用 postcss 和 cssnano 进行最小化，所以此处不需要重复最小化
  },
});

// PostCSS-loader
BASE_CSS_LOADER_USE.push({
  loader: 'postcss-loader',
  options: {
    plugins: (loader) => [
      require('postcss-import')({root: loader.resourcePath}),
      require('autoprefixer')(), // CSS浏览器兼容
      require('cssnano')(),  // 压缩css
    ],
  },
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
      loader: 'sass-loader',
    },
  ]),
});

// 合并 webpack 配置
export default webpackMerge(
  webpackConfig,  // 默认配置
  require(`./webpack/webpack.${__ENV__}.config`)(config), // 根据环境变量，载入 Webpack 配置
);