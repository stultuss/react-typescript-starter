import {IRouteConfig} from '../routes';
import Component from './index';

const route: IRouteConfig = {
  path: '/home/user',
  component: Component,

  // fixme 允许被 loadData 的数据必须是公共数据，而不是个人数据。这里只是作为例子展开。
  loadData: ({stores}) => Promise.all([stores.userStore.init()]),
};

export default route;