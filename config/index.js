import * as LibPath from 'path';

const debug = require('debug')('app:config');
const version = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/-/g, '').split(' ')[0];

// ========================================================
// 默认配置
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',
  version: version,

  // ----------------------------------
  // 项目文件夹配置
  // ----------------------------------
  path_base: LibPath.resolve(__dirname, '..'),
  dir_src: 'src',
  dir_dist: 'dist',

  // ----------------------------------
  // 项目服务器配置
  // ----------------------------------
  server_host: '127.0.0.1', // use string 'localhost' to prevent exposure on local network
  server_port: process.env.PORT || 8080,
  server_public_path: '/',
  server_plugins_gzip: {
    enabled: false
  },
  server_react_render: {
    enabled: false
  },
  // ----------------------------------
  // 单元测试配置
  // ----------------------------------
  coverage_reporters: [
    {type: 'text-summary'},
    {type: 'lcov', dir: 'coverage'}
  ],

  // ----------------------------------
  // 项目编译配置
  // ----------------------------------
  compiler_html_filename: 'index.html',
  compiler_vendor: [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom'
  ],
};

// ------------------------------------
// 工具
// ------------------------------------
const resolve = LibPath.resolve;
const base = (...args) => Reflect.apply(resolve, null, [config.path_base, ...args]);

config.utils_paths = {
  base: base,
  src: base.bind(null, config.dir_src),
  dist: base.bind(null, config.dir_dist),
};

// ========================================================
// 根据环境变量覆盖默认配置
// ========================================================
debug(`根据环境配置覆盖默认配置, NODE_ENV: "${config.env}"`);

const environments = require('./environments').default;
const overrides = environments[config.env];
if (overrides) {
  debug(`环境配置已启用`);
  Object.assign(config, overrides(config));
} else {
  debug(`环境配置未启用，没有找到该环境配置，启用默认配置`);
}

// ------------------------------------
// 环境变量
// ------------------------------------
config.globals = {
  'process.env': {
    'NODE_ENV': config.env
  },
  '__ENV__': config.env,
  '__SSR__': config.env === 'development' ? false : config.server_react_render.enabled, // 只有 production 才可以开启服务端渲染（偷懒）
  '__DEBUG__': config.env === 'development',
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json');

config.compiler_vendor = config.compiler_vendor
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true;

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    );
  });

export default config;
