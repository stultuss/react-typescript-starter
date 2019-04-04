import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './containers/App';

import {createStore} from './store';

declare var window: {
  __INITIAL_STATE__: any,
  location: {
    pathname: string
  }
};

console.info(`[当前环境] ${process.env.NODE_ENV}`);
console.info(`[当前路径] ${window.location.pathname}`);

const stores = createStore(window.__INITIAL_STATE__);

// ========================================================
// Go!
// ========================================================
ReactDom.render(<App stores={stores}/>, document.getElementById('wrapper'));