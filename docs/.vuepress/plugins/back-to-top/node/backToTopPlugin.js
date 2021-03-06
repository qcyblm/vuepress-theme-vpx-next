'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.backToTopPlugin = void 0
const utils_1 = require('@vuepress/utils')
const backToTopPlugin = (_, app) => {
  if (app.env.isDev && app.options.bundler.endsWith('vite')) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        optimizeDeps: {
          exclude: ['ts-debounce'],
        },
      }
    )
  }
  return {
    name: '@vuepress/plugin-back-to-top',
    clientAppRootComponentFiles: utils_1.path.resolve(
      __dirname,
      '../client/components/BackToTop.js'
    ),
  }
}
exports.backToTopPlugin = backToTopPlugin
