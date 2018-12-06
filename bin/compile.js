import * as LibFs from 'fs-extra';
import webpack from 'webpack';

import config from '../config';
import webpackConfig from '../webpack.config';

const debug = require('debug')('app:bin:compile');
const paths = config.utils_paths;

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
        debug('Webpack 编译中遇到致命错误:', err.stack || err);
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

      // 错误处理
      if (stats.hasErrors()) {
        debug('Webpack 编译中遇到错误');
        debug(stats.toJson().errors.join('\n'));
        return reject(new Error('Webpack 编译中遇到错误'));
      }

      if (stats.hasWarnings()) {
        debug('Webpack 编译中遇到警告。');
        debug(stats.toJson().warnings.join('\n'));
      } else {
        debug('Webpack 编译完成.');
      }

      resolve(stats);
    });
  });
};

(async () => {
  try {
    debug('Webpack 编译开始');
    const stats = await webpackCompiler(webpackConfig);
    if (stats.hasWarnings()) {
      debug('Webpack 编译中出现警告，退出编译.');
      process.exit(1);
    }

    debug('拷贝静态资源');
    LibFs.copySync(paths.src('public'), paths.dist());
  } catch (e) {
    debug('Webpack 编译器遇到错误:', e);
    process.exit(1);
  }
})();
