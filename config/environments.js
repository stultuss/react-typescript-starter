// Here is where you can define configuration overrides based on the execution environment.
// Supply a key to the default export matching the NODE_ENV that you wish to target, and
// the base configuration will apply your overrides before exporting itself.
export default {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // NOTE: In development, we use an explicit public path when the assets
  // are served webpack by to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  development: (config) => ({
    server_public_path: `http://${config.server_host}:${config.server_port}/`, // 本地开发服务器相对文件目录
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'preview'
  // ======================================================
  preview: (config) => ({
    server_public_path: './', // 本地相对文件目录，file:// ....
    server_plugins_gzip: {
      enabled: true,
      threshold: '100kb'
    }
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: (config) => ({
    compiler_html_filename: 'index.tpl',
    server_public_path: '/', // 远程相对文件目录
    server_plugins_gzip: {
      enabled: true,
      threshold: '100kb'
    }
  })
};
