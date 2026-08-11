import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, matchRoutes } from 'react-router-dom'
import App from './App'
import { routes, type AppRoute } from './routes'
import { createStore, type StoreState } from './store'
import './styles/global.scss'

declare global {
  interface Window {
    __INITIAL_STATE__?: StoreState
  }
}

async function bootstrap() {
  const stores = createStore(window.__INITIAL_STATE__)
  const matches = matchRoutes(routes, window.location.pathname) ?? []

  // 首屏前先预加载懒加载页面模块，避免 hydration 后闪现 loading
  await Promise.all(matches.map(({ route }) => (route as AppRoute).preload?.()))

  const app = (
    <StrictMode>
      <BrowserRouter>
        <App stores={stores} />
      </BrowserRouter>
    </StrictMode>
  )

  const container = document.getElementById('root')!
  if (container.childElementCount > 0) {
    hydrateRoot(container, app)
  } else {
    createRoot(container).render(app)
  }
}

void bootstrap()
