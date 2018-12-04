// ========================================================
// Webpack 默认配置（无模式）
//
// 本配置请勿使用，仅做学习用，其中的配置项默认都会在 development 和 production 中开启
// 配置指南：https://webpack.docschina.org/guides/
// 结构链接：https://github.com/webpack/webpack/blob/master/schemas/WebpackOptions.json
// ========================================================

// ------------------------------------------------
// 默认通用配置 both development mode & production mode
// ------------------------------------------------
const webpackConfig = {
  // 默认入口点
  entry: './src/index.js',
  // 默认输出位置
  output: {
    filename: 'main.js',
    path: './dist/'
  },
  optimization: {
    // 移除在父 chunk 中已经存在并且可用的 chunk
    // bad: 计算时间↑↑，
    // good：包体积↓↓↓
    removeAvailableModules: true,
    // 移除空 chunk
    // bad: 计算时间↑，
    // good：并行请求↓↓↓
    removeEmptyChunks: true,
    // 合并相同的 chunk
    // bad: 计算时间↑，
    // good：并行请求↓↓↓
    mergeDuplicateChunks: true,
    // [必要前置项目]
    // 确定模块 export 的内容，是其他优化或代码生成的前置条件，有关生产环境代码压缩方面依赖比较多
    // bad: 计算时间↑，包体积↑
    providedExports: true,
    // 找到 chunk 中共同依赖的模块,取出来生成单独的 chunk
    // bad: 计算时间↑，并行请求↑
    // good: 包体积↓↓↓
    /**
     * https://webpack.docschina.org/plugins/split-chunks-plugin/#defaults
     *
     * webpack will automatically split chunks based on these conditions:
     *  * New chunk can be shared OR modules are from the node_modules folder
     *  * New chunk would be bigger than 30kb (before min+gz)
     *  * Maximum number of parallel requests when loading chunks on demand would be lower or equal to 5
     *  * Maximum number of parallel requests at initial page load would be lower or equal to 3
     */
    splitChunks: {
      // 该选项表示将选择哪些块进行优化 [all | "async" | "initial"]
      chunks: 'async',
      // Minimum size for a chunk to be generated.
      minSize: 30000,
      // Minimum number of chunks that must share a module before splitting.
      minChunks: 1,
      // Maximum number of parallel requests when on-demand loading.
      maxAsyncRequests: 5,
      // Maximum number of parallel requests at an entry point.
      maxInitialRequests: 3,
      // 该选项允许您为生成的名称指定分隔符。 (e.g. vendors~main.js).
      // automaticNameDelimiter: '~',
      // The name of the split chunk.  [boolean: true, function, string]
      name: true,
      // Cache groups can inherit and/or override any options from splitChunks.*; but test, priority and reuseExistingChunk can only be configured on cache group level. To disable any of the default cache groups, set them to false. [boolean: false | object]
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    // 将 webpack 生成的 runtime 作为独立 chunk ，runtime 包含在模块交互时，模块所需的加载和解析逻辑（manifest）。
    // good: 缓存
    /**
     * Setting optimization.runtimeChunk to true adds an additional chunk to each entry point containing only the runtime:
     *  * single: creates a runtime file to be shared for all generated chunks.
     *  * multiple: creates multiple runtime files for common chunks.
     */
    runtimeChunk: false,
  },
};

switch (webpackConfig.mode) {
  case 'development':
    // ------------------------------------------------
    // 默认开发配置 only development mode
    // ------------------------------------------------
    // 选择一种 source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度. [boolean: false, function, string]
    // devtool 相关选项：https://webpack.docschina.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx
    // bad: 计算时间↑↑↑
    // good：调试难度↓↓↓
    webpackConfig.devtool = 'eval';
    // 缓存编译后没有修改过的模块
    // bad: 内存占用↑↑↑
    // good：构建速度↑↑↑
    webpackConfig.cache = true;
    webpackConfig.module = {
      // 使缓存方式变的更激进，官方解释: ’catch everything, but unsafe’，依赖于 cache 开启
      // bad: 内存占用↑
      // good：构建速度↑↑
      unsafeCache: true,
    };
    webpackConfig.output = {
      // 在构建产出的 bundle 中引入当前段落包含模块信息的相关注释
      // bad: 包体积↑
      // good：代码可读性↑
      pathinfo: true,
    };
    webpackConfig.optimization = Object.assign({
      // 给模块更容易识别的名称，取代用 ids 命名。
      // bad: 包体积↑
      // good：调试难度↓
      namedModules: true,
      // 给 chunk 更容易识别的名称，取代用 ids 命名。
      // bad: 包体积↑
      // good：调试难度↓
      namedChunks: true,
    }, webpackConfig.optimization);
    break;
  case 'production':
    // production 配置默认仅在 production mode 下开启
    // 展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
    // bad: 计算时间↑
    // good：开启性能警告提示
    webpackConfig.performance = {
      // 打开/关闭提示。此外，当找到提示时，告诉 webpack 抛出一个错误或警告 [boolean: false | "error" | "warning"]
      hints: 'error', // 开发环境推荐 warning，生产环境推荐 error
      // 此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示.
      maxEntrypointSize: 250000,
      // 此选项根据单个资源体积，控制 webpack 何时生成性能提示
      maxAssetSize: 250000,
      // 此属性允许 webpack 控制用于计算性能提示的文件
      assetFilter: (assetFilename) => {
        return !(/\.map$/.test(assetFilename));
      }
    };
    webpackConfig.optimization = Object.assign({
      // 如果当前标记的 chunk 是另外一个 chunk 的子集并且已经加载完成时，当前标记的 chunk 将不会再次加载。
      // bad: 计算时间↑
      // good：并行请求↓↓
      flagIncludedChunks: true,
      // 使用更短的 ids 命名使用频率高的模块
      // bad: 计算时间↑
      // good：包体积↓
      occurrenceOrder: true,
      // 确定每个模块导出的使用情况，依赖于 optimization.providedExports, 是 production 模式下其他优化或代码生成的前置条件，如更彻底的代码混淆、去除无效 export 等.
      // bad: 计算时间↑↑
      // good：包体积↓↓
      usedExports: true,
      // 识别在模块或者 package.json 中无用的代码块，然后 shaking 掉, 依赖 optimization.providedExport optimization.usedExports
      // 例如 :import { debounce } from 'lodash' 等价于 import debounce from 'lodash/lib/debounce',而不是将整个 loadash 载入进来。
      // bad: 计算时间↑
      // good：包体积↓↓↓
      sideEffects: true,
      // 尝试找到模块间的关联关系并将可以合并的模块合并掉。依赖于 optimization.providedExports optimization.usedExports
      // 例如：a.js 依赖于 loadash 且项目只有 a.js 引用了 loadash ，那么 a.js 和 loadash 就可以合并成一个模块,用来提高运行时的解析速度，会产生很多额外的消耗（额外的语法分析、作用域分析等等）。
      // bad: 计算时间↑
      // good：包体积↓↓↓
      concatenateModules: true,
      // 代码压缩，混淆，uglifyjs干的事情，缩减产出 bundle 体积。
      // bad: 计算时间↑↑↑
      // good：包体积↓↓↓
      minimize: true,
      // 编译错误时，不会输出编译错误的 bundle
      // bad: unable to use working part application
      // good：no broken bundle
      noEmitOnErrors: true,
    }, webpackConfig.optimization);
    break;
}

export default webpackConfig;