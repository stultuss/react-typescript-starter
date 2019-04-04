import * as React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import {UserStore} from '../../store/user';
import Loading from '../../component/Loading';

import './index.scss';

// Your component own properties
type IProps = RouteComponentProps<any> & {
  userStore?: UserStore
}

// App 入口
@inject('userStore')
@observer
class App extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const {userStore} = this.props;

    if (!userStore.user) {
      this.props.userStore.update();
    }
  }

  render() {
    const {userStore} = this.props;

    return (
      <div>
        <h3>User Page</h3>
        <div>{(userStore.loading) ?
          <Loading sec={3}/> : this.renderUser(userStore.user, userStore.add, userStore.reduce)}</div>
      </div>
    );
  }

  renderUser(user, onAdd, onReduce) {
    if (!user) {
      return null;
    }

    return (
      <div>
        <ul>
          <li>id: {user.id}</li>
          <li>name: {user.name}</li>
          <li>from: {user.from}</li>
          <li>money: {user.money}</li>
        </ul>
        <div className={''}>
          <button onClick={onAdd}>+</button>
          <button onClick={onReduce}>-</button>
        </div>
      </div>
    );
  }
}

export default withRouter(App);