import * as LibPath from 'path';
import * as LibFs from 'mz/fs';
import webpack from 'webpack';
import Koa from 'koa';
import koaStatic from 'koa-static';
import koaHistoryApiFallback from 'koa-connect-history-api-fallback';

import compressHandlerMiddleware from './middleware/compress-handler';
import requestHandlerMiddleware from './middleware/request-handler';
import webpackDevMiddleware from './middleware/webpack-dev';
import webpackHMRMiddleware from './middleware/webpack-hmr';
import ssr from './ssr';

import config from '../config';
import webpackConfig from '../webpack.config';

const paths = config.utils_paths;

// 创建 KOA 服务器
const app = new Koa();

// 启用 gzip 压缩
if (config.server_plugins_gzip && config.server_plugins_gzip.enabled === true) {
  app.use(compressHandlerMiddleware.register(config.server_plugins_gzip));
}

// 将所有路由请求到根目录的 index.html，如果你想实现渲染同构，则需要删除这个中间件
app.use(koaHistoryApiFallback({
  verbose: false
}));

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig);
  const {publicPath} = webpackConfig.output;

  // 启用静态资源服务，路径`~/src/public`
  app.use(koaStatic(paths.src('public')));
  // 启用 webpack-dev 开发组件
  app.use(webpackDevMiddleware(compiler, publicPath));
  // 启用 webpack-hmr 热替换
  app.use(webpackHMRMiddleware(compiler));
} else {
  // 启用静态资源服务，路径`~/dist`，在 compile 命令中，会将这个文件夹拷贝到 `~/dist`
  app.use(koaStatic(paths.dist()));
  // 启用请求分析
  app.use(requestHandlerMiddleware.register());
  // 启用服务端渲染 SSR
  app.use(async (ctx, next) => await ssr(ctx, next, paths.dist()));
  // 默认路由
  app.use(async (ctx, next) => {
    ctx.body = await LibFs.readFile(LibPath.join(__dirname, '..', 'dist', 'index.tpl'), {'encoding': 'utf8'});
  });
}

export default app;