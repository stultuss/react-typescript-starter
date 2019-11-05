# React Typescript Starter
=========================

[![Build][travis-image]][travis-url]
[![Linux Build][travis-linux-image]][travis-linux-url]
[![Windows Build][travis-windows-image]][travis-windows-url]
[![Test Coverage][coveralls-image]][coveralls-url]

> This starter kit is designed  to help you up and running react app for rapid development

---

## Introduction

Note that this project  include **Server-Side Rendering**, **Static code analysis**, **Testing Frameworks**.
If needed othes package, please fork this repository and add your own that meets your requirements.

Ideal for creating React apps from the scratch.

### Contains

- [x] **Typescript** 3.2
- [x] **React** 16.8.6
- [x] **React Router** 5.0.0
- [x] **Koa** 2.6
- [x] **MobX** 5.9

### Build Tools

- [x] **Webpack** 4
  - [x] Webpack Bundle Analyzer
  - [x]  HTML Webpack Plugin
  - [x] Fork TS Checker Plugin
  - [x] Inline Manifest Webpack Plugin
  - [x] Mini CSS Extract Plugin
  - [x] Optimize CSS Assets Plugin
- [x] **Babel Loader** 8.0
- [x] **Sass Loader** 7.1
- [x] **PostCSS Loader** 3.0
- [x] **React Hot Loader** 4.3

## Support

- [x] Async loading of components
- [x] Server-Side Rendering
- [ ] Testing Framework

## Installation

````bash
$ npm install
````

## How to use

### Run 

1. Quick start

````bash
$ npm start 							// Starting the development environment 
````

2. Bundle Anlyzer Report

```bash
$ npm run report
```

3. Other Examples

```bash
$ npm run preview 		            // Starting the preview environment 
$ npm run prod  					// Starting the production environment 
```

### Enable 

1. Enable Server-Side Rendering

```bash
$ vi ./config/environments.js
```

```typescript
export default {
  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: (config) => ({
    server_react_render: {
      enabled: true // Enable Server-Side Rendering
    },
  }),
};

```

2. Enable Async loading of components

```bash
$ vi ./src/containers/Page1/index.tsx
```

Please use react-loadable demo

```typescript jsx
import * as React from 'react';
import * as Loadable from 'react-loadable';

const LoadableComponent = Loadable({
    loader: () => import('./Loadable'),
    loading: () => <div>Loading...</div>
});

export default class LoadableApp extends React.Component {
    render() {
        return <LoadableComponent />;
    }
}
```

## Deploy

```bash
$ npm run deploy
```

# License

MIT

[travis-image]: https://travis-ci.org/stultuss/react-typescript-starter.svg?branch=master
[travis-url]: https://travis-ci.org/stultuss/react-typescript-starter
[travis-linux-image]: https://img.shields.io/travis/stultuss/react-typescript-starter/master.svg?label=linux
[travis-linux-url]: https://travis-ci.org/stultuss/react-typescript-starter
[travis-windows-image]: https://img.shields.io/travis/stultuss/react-typescript-starter/master.svg?label=windows
[travis-windows-url]: https://travis-ci.org/stultuss/react-typescript-starter
[coveralls-image]: https://img.shields.io/coveralls/stultuss/react-typescript-starter/master.svg
[coveralls-url]: https://coveralls.io/r/stultuss/react-typescript-starter?branch=master
