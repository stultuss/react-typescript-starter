import * as LibPath from 'path';
import * as LibFs from 'mz/fs';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import AppContainer from './containers/App';

export default async (ctx, staticPath) => {
    const context = {} as any;
    const html = ReactDOMServer.renderToString(
        <StaticRouter location={ ctx.req.url } context={ context }>
            <AppContainer/>
        </StaticRouter>
    );

    if (context.url) {
      return {
          status: 302,
          url: context.url
      };
    }

    if (html !== '') {
        return {
            status: 200,
            body: await renderPage(staticPath, html, {})
        };
    }

    return {
        status: 404
    }
};


// ========================================================
// Server Side Render
// ========================================================
async function renderPage(staticPath, content, state) {
    let html = await LibFs.readFile(LibPath.join(staticPath, 'index.tpl'), {'encoding': 'utf8'});
    html = html.replace(/<div id="wrapper"><\/div>/, '<div id="wrapper">' + content + '</div>');
    html = html.replace(/window.__INITIAL_STATE__ = \{\}/, `window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(/</g, '\\x3c')}`);
    return html;
}