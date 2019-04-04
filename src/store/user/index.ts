import axios from 'axios';
import {observable, action} from 'mobx';

interface IUser {
  id: number;
  name: string;
  from: string;
  money: number;
}

export class UserStore {

  @observable loading = false;
  @observable user: IUser;

  @action init = () => {
    this.user = {
      id: 1,
      name: 'Klaus',
      from: 'Sever Side',
      money: 0,
    };

    // fixme 被 loadData 调用的方法初始化数据，必须有个过期时间，否则会永远存在与 SSR 的 store 中。
    setTimeout(() => {
      this.user = null;
    }, 30000) // 30s 过期
  };

  @action update = () => {
    this.loading = true;
    setTimeout(() => {
      axios.get('/mock/user.json', {responseType: 'json'})
        .then((res) => {
          this.loading = false;
          this.user = res.data;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    }, 3000);
  };

  @action add = () => {
    this.user.money++;
  };

  @action reduce = () => {
    this.user.money--;
  };
}

export default new UserStore();