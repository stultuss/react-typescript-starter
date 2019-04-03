import * as React from 'react';
import * as Loadable from 'react-loadable';
// import BaseComponent from '../BaseComponent';
// import {AppContainer} from 'react-hot-loader';

interface Props {
  match: any
}

interface State {}

// class App extends BaseComponent<Props, State> {
//     constructor(props: Props) {
//         super(props);
//     }
//
//     render() {
//         return Loadable({
//             loader: () => import('./Loadable'),
//             loading: () => <div>Loading...</div>
//         });
//     }
// }

const LoadableComponent = Loadable({
  loader: () => import('./Loadable'),
  loading: () => <div>Loading...</div>
});

export default class LoadableApp extends React.Component {
  render() {
    return <LoadableComponent {...this.props as Props}/>;
  }
}