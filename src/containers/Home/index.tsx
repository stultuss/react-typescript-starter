import * as React from 'react';
import {Link} from 'react-router-dom';
import {renderRoutes, RouteConfig} from 'react-router-config';

type IProps = {
  route?: RouteConfig
}

class App extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {route} = this.props;
    return (
      <div>
        <h1>Home Page</h1>
        <h3>Links</h3>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/home/user'}>User</Link></li>
          <li><Link to={'/home/path'}>PathParams</Link></li>
        </ul>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default App;