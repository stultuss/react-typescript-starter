import * as React from 'react';
import * as Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./default'),
  loading: () => <div>Loading...</div>,
});

export default class LoadableApp extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}