import {RouteConfig} from 'react-router-config';
import Home from './Home';
import Admin from './Admin';
import NotFound from './404';

export interface IRouteConfig extends RouteConfig {
  loadData?: ({stores}) => void
}

const routes: IRouteConfig[] = [
  {
    path: '/',
    exact: true, // 防止 location 被 path='/'截胡了
    component: Home,
    routes: require('./Home/routes').default,
  },
  {
    path: '/home',
    component: Home,
    routes: require('./Home/routes').default,
  },
  {
    path: '/admin',
    component: Admin,
  },
  {
    component: NotFound,
  },
];

export default routes;
