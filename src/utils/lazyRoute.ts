import { createElement, type ComponentProps, type ComponentType } from 'react'

type LazyRoute<T extends ComponentType> = T & { $$preload: () => Promise<void> }

/**
 * SSR 友好的路由级代码分割：
 * - 客户端首次进入时，main.tsx 会先 await 匹配路由的 $$preload()，避免首屏闪现 loading；
 * - 服务端 renderToString 之前同样会预加载匹配的模块，保证首屏 HTML 是完整页面；
 * - 未预加载时（例如客户端导航到新 chunk），组件抛出的 promise 会被 Suspense 捕获。
 */
export function lazyRoute<T extends ComponentType>(loader: () => Promise<{ default: T }>): LazyRoute<T> {
  const state: { status: 'pending' | 'resolved'; Component?: T } = { status: 'pending' }
  let promise: Promise<void> | undefined

  const preload = async () => {
    if (state.status === 'resolved') return
    // 缓存同一个 promise，避免 Suspense 重试时抛出新的 pending promise
    promise ??= loader().then((module) => {
      state.Component = module.default
      state.status = 'resolved'
    })
    await promise
  }

  function Lazy(props: ComponentProps<T>) {
    if (state.status !== 'resolved') throw preload()
    return createElement(state.Component!, props)
  }

  return Object.assign(Lazy, { $$preload: preload }) as LazyRoute<T>
}
