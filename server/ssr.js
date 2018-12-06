import * as LibPath from 'path';
import * as LibFs from 'mz/fs';

export default async (ctx, next, staticPath) => {
  const context = {};
  const html = '';
  // const html = ReactDOMServer.renderToString(
  //   <StaticRouter location={ctx.req.url} context={context}>
  //     <Entity />
  //   </StaticRouter>
  // );

  if (context.url) {
    ctx.status = 302;
    ctx.redirect(context.url);
    return;
  }

  if (html !== '') {
    console.log(html);
    ctx.body = 'Hello World';
    return;
    // res.write(`
    //         <!DOCTYPE html>
    //         <div id="app">${html}</div>
    //     `)
    // res.end()
  }

  await next();
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

// ========================================================
// Go!
// ========================================================
// export default function render(ctx, staticPath) {
//
//   return new Promise((resolve) => {
//     cookie.setRawCookie(ctx.headers.cookie);
//
//     let api = new ApiPromise();
//     let store = createStore(api, browserHistory);
//     let routes = rootRouter(store);
//
//     match({ routes, location: ctx.originalUrl }, (error, redirectLocation, renderProps) => {
//       if (error) {
//         resolve({ status: 500, body: error.message });
//       } else if (redirectLocation) {
//         resolve({ status: 302, redirectPath: `${ redirectLocation.pathname }${ redirectLocation.search }` });
//       } else if (renderProps) {
//         fetchAllData(store.dispatch, renderProps.components, renderProps.params, ctx.query)
//           .then(() => {
//             const initialState = store.getState();
//             const initialView = ReactDOMServer.renderToString(
//               <Provider store={store}>
//                 <RouterContext {...renderProps} />
//               </Provider>
//             );
//
//             resolve({
//               status: 200,
//               body: renderFullPage(staticPath, initialView, initialState)
//             });
//           });
//
//       } else {
//         resolve({ status: 404, body: 'Not Found Page' });
//       }
//     });
//   });
//
// };
