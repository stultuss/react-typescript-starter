import LibFs from 'fs-extra';
import webpack from 'webpack';
import config from '../config';

const debug = require('debug')('app:bin:compile');
const paths = config.utils_paths;
const {__SSR__} = config.globals;

/**
 * 环境编译
 *
 * @param webpackConfig
 * @return {Promise<any>}
 */
const webpackCompiler = (webpackConfig) => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    compiler.run((err, stats) => {
      // 异常处理
      if (err) {
        if (err.details) {
          debug(err.details);
        }
        return reject(err);
      }

      // 显示构建信息
      console.log(stats.toString({
        modules: false, // 不添加构建模块信息
        children: false, // 不添加 children 信息
        chunks: false,  // 使构建过程更静默无输出
        colors: true    // 在控制台展示颜色
      }));

      resolve(stats);
    });
  });
};

(async () => {
  try {
    if (__SSR__) {
      debug('Webpack SSR 编译开始');
      const stats = await webpackCompiler(require('../webpack/webpack.ssr.config').default);
      if (stats.hasWarnings() || stats.hasErrors()) {
        debug('Webpack SSR 编译中出现警告，退出编译.');
        process.exit(1);
      } else {
        debug('Webpack SSR 编译完成.');
      }
    }

    debug('Webpack 编译开始');
    const stats = await webpackCompiler(require('../webpack.config').default);
    if (stats.hasWarnings() || stats.hasErrors()) {
      debug('Webpack 编译中出现警告，退出编译.');
      process.exit(1);
    } else {
      debug('Webpack 编译完成.');
    }

    debug('拷贝静态资源');
    LibFs.copySync(paths.src('public'), paths.dist());
  } catch (e) {
    debug('Webpack 异常退出:', e);
    process.exit(1);
  }
})();
