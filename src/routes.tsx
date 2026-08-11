import type { ReactNode } from 'react'
import type { IndexRouteObject, NonIndexRouteObject, Params } from 'react-router-dom'
import { lazyRoute } from './utils/lazyRoute'
import type { Stores } from './store'
import HomeLayout from './pages/Home'
import HomeDefault from './pages/Home/default'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

interface AppRouteData {
  element: ReactNode
  status?: number
  /** 预加载懒加载的页面模块（SSR 与客户端首屏共用） */
  preload?: () => Promise<void>
  /** 服务端渲染前的数据预取 */
  loadData?: (stores: Stores, match: { params: Params }) => void | Promise<void>
}

export type AppRoute =
  | (Omit<IndexRouteObject, 'element' | 'children'> & AppRouteData & { children?: undefined })
  | (Omit<NonIndexRouteObject, 'element' | 'children'> & AppRouteData & { children?: AppRoute[] })

const UserPage = lazyRoute(() => import('./pages/User'))
const PathParamsPage = lazyRoute(() => import('./pages/PathParams'))

export const routes: AppRoute[] = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomeDefault /> },
      {
        path: 'user',
        element: <UserPage />,
        preload: UserPage.$$preload,
        loadData: (stores) => stores.userStore.init(),
      },
      // PathParams 页面内部有嵌套 <Routes>（descendant routes），父路径必须以 /* 结尾，
      // 否则 /path 与 /path/:id 都匹配不上
      { path: 'path/*', element: <PathParamsPage />, preload: PathParamsPage.$$preload },
    ],
  },
  {
    path: 'admin',
    element: <Admin />,
  },
  {
    path: '*',
    status: 404,
    element: <NotFound />,
  },
]
