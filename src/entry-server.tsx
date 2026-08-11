import { renderToString } from 'react-dom/server'
import { StaticRouter, matchRoutes } from 'react-router-dom'
import App from './App'
import { routes, type AppRoute } from './routes'
import { createStore, serializeState, type StoreState } from './store'

export interface RenderResult {
  html: string
  state: StoreState
  status: number
}

export async function render(url: string): Promise<RenderResult> {
  const stores = createStore()
  const matches = matchRoutes(routes, url) ?? []

  // 预加载匹配路由的懒加载模块 + 数据预取（loadData）
  await Promise.all(
    matches.map(({ route, params }) =>
      Promise.all([
        (route as AppRoute).preload?.(),
        (route as AppRoute).loadData?.(stores, { params }),
      ]),
    ),
  )

  const html = renderToString(
    <StaticRouter location={url}>
      <App stores={stores} />
    </StaticRouter>,
  )

  const status = (matches.at(-1)?.route as AppRoute | undefined)?.status ?? 200
  return { html, state: serializeState(stores), status }
}
