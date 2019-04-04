import * as LibPath from 'path';
import * as LibFs from 'mz/fs';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {matchRoutes, renderRoutes} from 'react-router-config';
import {Provider, useStaticRendering} from 'mobx-react';

import routes, {IRouteConfig} from './containers/routes';
import {createStore} from './store';

// 避免 mobx 服务端渲染的内存泄漏问题
useStaticRendering(true);

// ========================================================
// Server Side Render
// ========================================================
function loadBranchData(url, stores) {
  const branch = matchRoutes(routes, url);
  const needs = branch.map(({route, match}: { route: IRouteConfig, match: any }) => {
    return route.loadData
      ? route.loadData({stores, ...match})
      : Promise.resolve(null);
  });
  return Promise.all(needs);
}

async function renderPage(staticPath, content, state) {
  let html = await LibFs.readFile(LibPath.join(staticPath, 'index.tpl'), {'encoding': 'utf8'});
  html = html.replace(/<div id="wrapper"><\/div>/, '<div id="wrapper">' + content + '</div>');
  html = html.replace(/window.__INITIAL_STATE__ = \{\}/, `window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(/</g, '\\x3c')}`);
  return html;
}

export default async (ctx, staticPath) => {
  const context = {} as any;

  // fixme store 里的数据需要设置过期
  const stores = createStore();

  await loadBranchData(ctx.originalUrl, stores);

  const html = renderToString(
    <Provider {...stores}>
      <StaticRouter location={ctx.req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>,
  );

  if (context.url) {
    return {
      status: 302,
      url: context.url,
    };
  }

  if (html !== '') {
    return {
      status: 200,
      body: await renderPage(staticPath, html, stores),
    };
  }

  return {
    status: 404,
  };
};