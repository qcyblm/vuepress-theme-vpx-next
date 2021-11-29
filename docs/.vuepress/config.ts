import { defineUserConfig } from '@vuepress/cli'
import { path } from '@vuepress/utils'
import { head, themeConfig } from './configs/index'

export default defineUserConfig({
  base: '/vuepress-theme-vpx-next/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vuepress-theme-vpx',
      description: '一款基于 VuePress 开发的主题',
    },
  },
  head,
  theme: '@qcyblm/vpx',
  themeConfig,
  plugins: [[path.resolve(__dirname, './plugins/back-to-top/node/index.js')]],
})
