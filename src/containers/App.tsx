import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {hot} from 'react-hot-loader';
import {Provider} from 'mobx-react';

import routes from './routes';
import '../public/styles/core.scss';

interface IProps {
  stores: object;
}

class App extends React.Component<IProps> {
  render() {
    const {stores} = this.props;
    return (
      <Provider {...stores}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default (process.env.NODE_ENV == 'development') ? hot(module)(App) : App;
