import * as React from 'react';
import {Link, Route} from 'react-router-dom';
import {IProps} from './index';

class AppComponent extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const match = (this.props as any).match;
    return (
      <div>
        <h3>Match Path Params</h3>
        <ul>
          <li><Link to={`${match.url}/components`}>Components</Link></li>
          <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
        </ul>
        <Route path={`${match.path}/:id`} component={Topic}/>
        <Route path={match.path} exact render={() => <h3>Please select a topic.</h3>}/>
      </div>
    );
  }
}

const Topic = ({match}) => <h3>Requested Param: {match.params.id}</h3>;

export default AppComponent;