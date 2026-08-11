import { createContext, useContext } from 'react'
import { UserStore, type UserStoreState } from './userStore'

export interface Stores {
  userStore: UserStore
}

export interface StoreState {
  userStore?: UserStoreState
}

/**
 * 每个请求/每次进入页面都重新创建 store，保证 SSR 与客户端互不污染。
 * 服务端预取数据后通过 serializeState 序列化到 window.__INITIAL_STATE__，
 * 客户端用同一份数据重建（hydration）。
 */
export function createStore(initialState?: StoreState): Stores {
  return {
    userStore: new UserStore(initialState?.userStore),
  }
}

export function serializeState(stores: Stores): StoreState {
  return {
    userStore: {
      loading: stores.userStore.loading,
      user: stores.userStore.user,
    },
  }
}

export const StoresContext = createContext<Stores | null>(null)

export function useStores(): Stores {
  const stores = useContext(StoresContext)
  if (!stores) {
    throw new Error('useStores must be used within StoresContext.Provider')
  }
  return stores
}
