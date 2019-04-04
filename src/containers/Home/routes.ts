import {IRouteConfig} from '../routes';
import Component from './default';

const routes: IRouteConfig[] = [
  {
    path: ['/', '/home'],
    exact: true, // 防止 location 被 path='/'截胡了
    component: Component,
  },
  require('../User/route').default,
  require('../PathParams/route').default,
];

export default routes;
