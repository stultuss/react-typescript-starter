import {mergeObservables} from '../utils';
import userStore from './user';

export const createStore = (initialStores?: any) => {
  const stores = {
    userStore,
  };

  if (!initialStores) {
    return stores;
  } else {
    return mergeObservables(stores, initialStores);
  }
};