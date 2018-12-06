import * as webpack from 'webpack';

const debug = require('debug')('app:webpack:config');

module.exports = (config) => {
  // ========================================================
  //  Webpack 默认配置（开发模式）
  //  <pre>
  //  mode = development 作为参数启动时，webpack 会使用默认最适合的开发环境配置，启动后它会更偏向于：
  //  * 开发和debug
  //  * 更快速的编译速度
  //  * 抛出更容易排查问题的运行时异常
  //  </pre>
  // ========================================================
  const webpackConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {},
    output: {},
    plugins: [],
    optimization: {},
    module: {},
  };

  // ------------------------------------
  // Entry Points
  // ------------------------------------
  webpackConfig.entry = {
    main: [
      `react-hot-loader/patch`,  // 启用 react HMR
      `webpack-hot-middleware/client?path=${config.server_public_path}__webpack_hmr`,  // 启用 html & css HMR
    ],
  };

  // ------------------------------------
  // Bundle Output
  // ------------------------------------
  // 开发模式走内存，所以不需要考虑浏览器缓存的问题，不用 chunkhash 进行命名
  webpackConfig.output = {
    filename: `assets_${config.version}/[name].js`,
    chunkFilename: `assets_${config.version}/[name].js`,
    publicPath: config.server_public_path
  };

  // ------------------------------------
  // Plugins
  // ------------------------------------
  debug('启用开发模式插件(HMR)');
  debug('步骤1：~/webpack.config.js 的 entry 配置 `webpack-hot-middleware/client?path=${config.server_public_path}__webpack_hmr`');
  debug('步骤2：~/webpack.config.js 的 plugins 配置 new webpack.HotModuleReplacementPlugin()');
  debug('步骤3：~/server/index.js 中 koa 使用 webpack-dev-middleware 中间件');
  debug('步骤4：~/server/index.js 中 koa 使用 webpack-hot-middleware 中间件');

  webpackConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(), // 启用 HMR
    // new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify('development') }) // 开发模式：默认 development
    // new webpack.NoEmitOnErrorsPlugin(), // 生产模式：默认开启 => optimization.noEmitOnErrors = true
    // new webpack.NamedModulesPlugin(), // 开发模式：默认开启 => optimization.namedModules = true
  ];

  // ------------------------------------
  // Optimizations
  // ------------------------------------
  webpackConfig.optimization = {
    minimize: false, // 关闭代码压缩，提升编译速度
  };

  return webpackConfig;
};