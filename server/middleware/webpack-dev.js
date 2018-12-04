import WebpackDevMiddleware from 'webpack-dev-middleware';
import applyExpressMiddleware from '../lib/apply-express-middleware';
import config from '../../config';

const paths = config.utils_paths;
const debug = require('debug')('app:server:webpack-dev');

export default (compiler, assetPath) => {
  debug('启用 Webpack dev middleware.');

  const middleware = WebpackDevMiddleware(compiler, {
    // 设定资源目录(必需)
    publicPath: assetPath,
    // 设定内容目录(HTML等页面文件夹)
    contentBase: paths.src(),
    // 是否启用热替换
    hot: true,
    // 是否向控制台显示任何内容
    quiet: false,
    // 是否仅显示警告和错误到控制台
    noInfo: false,
    // 切换到延迟模式，这意味着没有 watch，而是重新编译每个请求
    lazy: false,
    // 显示统计信息的相关选项
    stats: {
      modules: false, // 不添加构建模块信息
      children: false, // 不添加 children 信息
      chunks: false,  // 使构建过程更静默无输出
      colors: true    // 在控制台展示颜色
    },
    // 关闭服务器端渲染模式。(未做测试，对于开启有何影响，暂不确定)
    serverSideRender: false,
  });
  // {
  // }
  return async (ctx, next) => {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: (content) => (ctx.body = content),
      setHeader: function () {
        ctx.set.apply(ctx, arguments);
      }
    });

    if (hasNext) {
      await next();
    }
  };
}
