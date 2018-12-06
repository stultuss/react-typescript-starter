import WebpackHotMiddleware from 'webpack-hot-middleware';
import applyExpressMiddleware from '../lib/apply-express-middleware';

const debug = require('debug')('app:server:webpack-hmr');

export default (compiler) => {
  debug('启用 Webpack hot middleware (HMR).');

  const middleware = WebpackHotMiddleware(compiler);
  return async (ctx, next) => {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res);
    if (hasNext && next) {
      await next();
    }
  };
}
