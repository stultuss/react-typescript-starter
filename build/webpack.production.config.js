import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

module.exports = (config) => {

  // ========================================================
  //  Webpack 默认配置（生产模式）
  //  <pre>
  //  mode = production 作为参数启动时，webpack 会使用默认最适合的生产环境配置，启动后它会更偏向于：
  //  * 产出更小体积的构建产物
  //  * 运行更高效的代码
  //  * 移除掉仅在开发环境使用的代码
  //  * 隐藏源码和路径
  //  * 产出使用方便的资源
  //  </pre>
  // ========================================================
  const webpackConfig = {
    mode: 'production',
    devtool: false,
    entry: {},
    output: {},
    plugins: [],
    optimization: {},
    module: {}
  };

  // ------------------------------------
  // Bundle Output
  // ------------------------------------
  webpackConfig.output = {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: config.server_public_path
  };

  // ------------------------------------
  // Plugins
  // ------------------------------------
  webpackConfig.plugins = [
    /**
     * 启用 CSS 优化配置：使用 cssnano 进行代码压缩
     * 1. 开启安全模式：避免 cssnano 重新计算 z-index
     * 2. 关闭 autoprefixer 功能： 默认使用 postcss-loader 的 autoprefixer 功能
     * 3. 移除注释
     */
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,  // 注意不要写成 /\.css$/g
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        safe: true,
        autoprefixer: false,
        mergeLonghand: false,
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    // new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}), // 生产模式：默认 production
    // new webpack.NoEmitOnErrorsPlugin(), // 生产模式：默认开启 => optimization.noEmitOnErrors = true
    // new webpack.optimize.ModuleConcatenationPlugin(), // 生产模式：默认开启 => optimization.ModuleConcatenationPlugin = true
  ];

  // ------------------------------------
  // Optimizations
  // ------------------------------------
  webpackConfig.optimization = {
    minimize: true, // 开启代码压缩
  };

  return webpackConfig;
};