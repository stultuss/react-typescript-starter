import http from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import Koa, { type Middleware } from 'koa'
import compress from 'koa-compress'
import koaStatic from 'koa-static'
import type { Connect, ViteDevServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const isDev = process.env.NODE_ENV !== 'production'
const port = Number(process.env.PORT ?? 5173)
const host = process.env.HOST ?? '127.0.0.1'

/**
 * 将 connect 风格的中间件（Vite dev middleware）适配为 Koa 中间件。
 * connect 中间件直接写 res，因此需要监听 res.end 来判断是否已响应。
 */
function fromConnect(connectApp: Connect.Server): Middleware {
  return async (ctx, next) => {
    const originalEnd = ctx.res.end
    let shouldContinue = false

    await new Promise<void>((resolve) => {
      ctx.res.end = ((...args: unknown[]) => {
        originalEnd.apply(ctx.res, args as unknown as Parameters<typeof originalEnd>)
        resolve()
      }) as typeof ctx.res.end

      connectApp(ctx.req, ctx.res, () => {
        shouldContinue = true
        resolve()
      })
    })
    ctx.res.end = originalEnd

    if (shouldContinue) {
      await next()
    }
  }
}

async function main() {
  const app = new Koa()
  app.use(compress({ threshold: '100kb' }))

  // 统一错误处理
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      console.error(error)
      ctx.status = 500
      ctx.body = '<h1>500 Internal Server Error</h1>'
    }
  })

  // 先创建 http server，开发模式下把 HMR 的 WebSocket 挂到同一个 server 上
  const httpServer = http.createServer(app.callback())

  let vite: ViteDevServer | undefined
  if (isDev) {
    const { createServer } = await import('vite')
    vite = await createServer({
      root,
      server: { middlewareMode: true, hmr: { server: httpServer } },
      appType: 'custom',
    })
    app.use(fromConnect(vite.middlewares))
  } else {
    app.use(koaStatic(path.join(root, 'dist/client'), { index: false }))
  }

  // SSR 兜底：所有未命中静态资源的请求都交给 React 渲染
  app.use(async (ctx) => {
    const url = ctx.request.originalUrl ?? ctx.url
    const rawTemplate = await readFile(
      isDev ? path.join(root, 'index.html') : path.join(root, 'dist/client/index.html'),
      'utf-8',
    )
    const template = isDev ? await vite!.transformIndexHtml(url, rawTemplate) : rawTemplate

    const { render } = isDev
      ? await vite!.ssrLoadModule('/src/entry-server.tsx')
      : await import(pathToFileURL(path.join(root, 'dist/server/entry-server.js')).href)

    const { html, state, status } = await render(url)

    const serializedState = JSON.stringify(state).replace(/</g, '\\u003c')
    ctx.status = status
    ctx.set('Content-Type', 'text/html')
    ctx.body = template
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace(
        '<script id="app-state">window.__INITIAL_STATE__ = {}</script>',
        `<script id="app-state">window.__INITIAL_STATE__ = ${serializedState}</script>`,
      )
  })

  httpServer.listen(port, host, () => {
    console.log(`[react-typescript-starter] ${isDev ? 'dev' : 'prod'} server: http://${host}:${port}`)
  })
}

main().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
