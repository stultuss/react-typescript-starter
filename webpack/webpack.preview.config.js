// 预审模式（自定义），最小化代码的情况下，保留部分开发环境配置
import webpack from 'webpack';
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
    devtool: 'source-map',
    entry: {},
    output: {},
    plugins: [],
    optimization: {},
    module: {},
    // 预审环境设置较大防止警告
    performance: {
      hints: false, // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
      maxEntrypointSize: 512000, // 入口最大依赖文件大小设置为 500 KiB
      maxAssetSize: 512000 // 单个资源文件大小设置为 500 KiB
    }
  };
  
  // ------------------------------------
  // Bundle Output
  // ------------------------------------
  webpackConfig.output = {
    filename: `assets_${config.version}/[name].[chunkhash:8].js`,
    chunkFilename: `assets_${config.version}/[name].[chunkhash:8].js`,
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
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('preview')}) // 生产模式：默认 production，所以要手动修改
    // new webpack.NoEmitOnErrorsPlugin(), // 生产模式：默认开启 => optimization.noEmitOnErrors = true
    // new webpack.optimize.ModuleConcatenationPlugin(), // 生产模式：默认开启 => optimization.ModuleConcatenationPlugin = true
  ];
  
  // ------------------------------------
  // Optimizations
  // ------------------------------------
  webpackConfig.optimization = {
    minimize: true, // 开启代码压缩
    splitChunks: {  // 开启代码分拆
      minSize: 250000,
      maxSize: 500000
    }
  };
  
  return webpackConfig;
};