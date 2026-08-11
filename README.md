# React TypeScript Starter

**讣告 / Obituary · 2016 — 2019（2026 年 8 月 11 日安葬）**

> 它曾是一个起点。现在它是一块墓碑。 

---

## 讣告

这是一个项目讣告。

它出生于 2016 年。彼时 React 15 刚发布，Redux 正当红，React Native 正在爆炸，TypeScript 2 刚刚成年。

它的主人是一位好奇的服务端工程师，对前端所知甚少，把 flux 架构画成了图，把 JS 内存模型啃成了笔记，然后决定手搓一切。

2019 年，它安静地去世了。最后的遗言是一份 dependabot 提交的依赖升级合并请求；次年 1 月还有一次微弱的 update，那不是回光返照，是最后一声叹息。

它死后，生态没有停下来。Next.js 把它引以为傲的 `loadData` 改名换姓，装进了所有新项目里。它要解决的问题，被更年轻、更成体系的框架们接手了。它死得不冤——它是被自己预见的未来淘汰的。

2026 年 8 月 11 日，主人把它挖出来，做了一次彻底的现代化改造，然后认真地问：还有继续用下去的价值吗？

答案是：**概念有，代码没有。**

于是它成了标本。

---

## 技术演进史（代际更迭）

它的一生跨越了三代状态管理（Flux → Redux → MobX）、三代服务端框架（Koa 1 → 2 → 3）与从 webpack 到 Vite 的整个构建时代。2018 年之后的部分有 git 作证；2018 年之前的部分来自主人记忆——最早的版本，连主人也记不清了。

| 年代 | 状态管理 | 服务端 | 同期关键事 |
| --- | --- | --- | --- |
| 2016 雏形 | Flux → Redux | Koa 1（generator 时代，版本已不可考）→ Koa 2 | React 15、React Router、react-hot-loader；生产环境运行中（主人记忆中） |
| 2017–18 回炉 | Redux | Koa 2 | 2018-12 补上 SSR 与异步拆包；antd 3 短暂入驻（2018-12 ～ 2019-04） |
| 2019 末年 | MobX 5（decorator 语法） | Koa 2 | react-router-config 5（路由即数据）、react-loadable、jest、Travis CI、coveralls；dependabot 留下最后的遗言 |
| 2026 安葬 | MobX 6（工厂式，SSR 安全） | Koa 3 | React 19、Vite 7、React Router 7、Vitest、GitHub Actions |

几件它自己记得的事：

- `loadData` 贯穿 Redux 与 MobX 两代，死后在 Next.js 里改了姓（`loader` / `getServerSideProps`）；
- Koa 1 的具体版本已无人记得——那是 `yield` 满地都是的年代；
- 它出生时正赶上 Flux 到 Redux 的交接，2019 年换成 MobX 5，2026 年换成 MobX 6——状态管理换代从一年一次变成七年一次：不是它懒，是生态终于稳定了。

### 按提交的工具演进（2018-12 开源后，git 作证）

- **2018-12-04 `ec42849` version init**：webpack 4 + Babel 6 + ts-loader 5 + TypeScript 3；Koa 2 全家桶（static / compress / proxy / history-api-fallback）；react-hot-loader、better-npm-run、debug、rimraf；css-loader / style-loader / sass-loader / node-sass / postcss（import / autoprefixer / cssnano）/ mini-css-extract-plugin / optimize-css-assets-webpack-plugin；html-webpack-plugin、inline-manifest-webpack-plugin、url-loader、json-loader；axios、underscore、normalize.css、mz
- **2018-12-04 `57b7910` Babel 7**：Babel 6 → @babel/* 7（preset-env / preset-react / preset-typescript、decorators、class-properties）；babel-loader 8 + fork-ts-checker-webpack-plugin + tslint / tslint-react；webpack-cli 下线
- **2018-12-05 `fe36ea1` 图片策略**：file-loader 入列、url-loader 调参，雪碧图退役
- **2018-12-06 `3017f4d` react-router**：react-router 4 + react-router-dom；antd 3 短暂入驻；ts-loader 退役（改由 Babel 剥类型 + fork-ts-checker 兜底）；fs-extra；项目更名 react-typescript-starter
- **2018-12-07 `3448998` SSR**：webpack-node-externals、SSR 构建配置、production 启动脚本
- **2018-12-12 `a87d003` 异步拆包**：react-loadable 5 + @babel/plugin-syntax-dynamic-import
- **2019-04-03 `8f7aaf0`**：README 更新；antd 3 离场——它只短暂存在了四个月
- **2019-04-04 `21059d6` MobX**：mobx 5 + mobx-react + mobx-react-devtools；react-router-config 5（路由即数据）；react 16.6 → 16.8，react-router 4 → 5
- **2019-05-22 `0cd1d56`**：tar 安全补丁
- **2019-11-05**：dependabot 批量升级（mixin-deep、lodash、axios）；Travis CI + coveralls 入驻；jest 24 + ts-jest + @types/jest 与首批测试用例；scripts 重构出 dev / preview / prod / report
- **2019-11-06 `50e110e`**：仓库地址 niklaus0823 → stultuss
- **2020-01-07 `2c798dd`**：最终快照，版本号定格
- **2026-08-11 `4f8dfde` 现代化改造**：Vite 7 + React 19 + TypeScript 5 + Koa 3 + MobX 6 + React Router 7 + Vitest + ESLint 9 + cross-env + tsx + GitHub Actions；node-sass → sass、react-hot-loader → Vite HMR、react-loadable → lazyRoute、Travis / coveralls → GitHub Actions、better-npm-run → 原生 scripts、mobx-react → mobx-react-lite

---

## 遗物清单（技术栈）

现代化改造后的遗体被安置如下：

- **React 19** + **TypeScript 5**（strict）
- **Vite 7**：构建、开发服务器、HMR
- **React Router 7**：library 模式——故意不用 data router，因为它想保留 `loadData` 的教学结构
- **MobX 6**：工厂式 store，SSR 安全
- **Koa 3**：SSR 服务器
- **Sass**（Dart Sass）
- **Vitest** + **Testing Library**
- **ESLint 9**（flat config）+ **GitHub Actions** CI

它身上那些老去的零件——node-sass、better-npm-run、react-loadable、四份 webpack 配置——已在火化时一并移除，未列入遗物清单。

---

## 如何参观这具标本

标本需要适宜的温度与湿度。以下命令可以唤醒它，但请记住：**它会思考，不会生长。**

```bash
npm install
```

- 开发（SSR + HMR）：`npm run dev` → http://127.0.0.1:5173
- 纯客户端参观（无 SSR）：`npm run dev:no-ssr`
- 正式陈列（构建 + 启动）：`npm run build && npm start`
- 定期体检：`npm run typecheck` / `npm run lint` / `npm test`

### 陈列布局

```text
.
├── index.html                  # HTML 模板（SSR 占位）
├── public/                     # 静态资源（图片、mock 数据、favicon）
├── server/index.ts             # Koa 3 服务器
├── src/
│   ├── main.tsx                # 客户端入口：hydration / 渲染
│   ├── entry-server.tsx        # SSR 入口：预取数据 + renderToString
│   ├── App.tsx                 # 应用外壳（Store Provider + Suspense + 路由）
│   ├── routes.tsx              # 路由配置（path / loadData / preload）
│   ├── store/                  # MobX stores（工厂式创建，SSR 安全）
│   ├── pages/                  # 页面组件
│   └── utils/lazyRoute.ts      # SSR 友好的懒加载工具
└── tests/                      # Vitest 测试
```

---

## 它想教会你的

1. **服务端渲染**：首屏完整 HTML + `window.__INITIAL_STATE__` hydration
2. **路由级代码分割**：SSR 友好的 `lazyRoute`，无 loading 闪现——这是它 2018 年没做到、2026 年才补上的遗憾
3. **数据预取**：`loadData` 在服务器渲染前执行。是的，这就是 Next.js 的原型
4. **状态管理**：MobX `UserStore`，工厂式创建，跨请求安全（它 2019 年的单例是个已知的伤疤）
5. **测试与 CI**：单元测试覆盖 store、懒加载工具与页面组件

### SSR 工作流（它体内最后的魔法）

1. 请求到达 `server/index.ts`
2. `entry-server.tsx` 的 `render(url)` 接管
3. `matchRoutes` 匹配路由，执行 `preload`（加载懒模块）与 `loadData`（预取数据）
4. `renderToString` 生成完整 HTML，`serializeState` 序列化 store 状态
5. 状态注入 `<script id="app-state">`，HTML 注入 `<div id="root">`
6. 客户端 `main.tsx` 读取 `window.__INITIAL_STATE__` 重建 store，`hydrateRoot` 接管页面

---

## 遗产

它的理念没有死，只是改了姓：

- `loadData` → Next.js 的 `loader` / `getServerSideProps`
- 单向数据流 → 依然是所有现代前端框架的共识
- 手搓 SSR → 交给框架，专业的事让专业的人做

它的一生证明了两个道理：一个好奇的工程师可以在没有框架的时代自己搭出这一切；以及，当框架时代到来时，亲手把它埋掉，是最高级的敬意。

---

## 告别

它活了十年，其中六年半是标本。

此致，敬礼。

## License

MIT
