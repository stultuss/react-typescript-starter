import { Suspense, type ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import { StoresContext, type Stores } from './store'
import { routes, type AppRoute } from './routes'
import Loading from './components/Loading'

function renderRouteList(routeList: AppRoute[]): ReactNode {
  return routeList.map((route, index) =>
    route.index === true ? (
      <Route key={index} index element={route.element} />
    ) : (
      <Route key={index} path={route.path} element={route.element}>
        {route.children ? renderRouteList(route.children) : null}
      </Route>
    ),
  )
}

export default function App({ stores }: { stores: Stores }) {
  return (
    <StoresContext.Provider value={stores}>
      <Suspense fallback={<Loading />}>
        <Routes>{renderRouteList(routes)}</Routes>
      </Suspense>
    </StoresContext.Provider>
  )
}
