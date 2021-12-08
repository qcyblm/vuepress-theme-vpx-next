import type { VpxThemeOptions } from '@qcyblm/vuepress-theme-vpx'
import { navbar } from './navbar'

export const themeConfig: VpxThemeOptions = {
  logo: 'https://qcyblm.gitee.io/vuepress-theme-vpx/assets/img/logo.png',
  darkMode: true,
  navbar,
  browserLocale: true,
  sidebar: [
    { text: '介绍', link: '/guide/', icon: 'BookOne' },
    { text: '扩展配置', link: '/guide/configs', icon: 'Stretching' },
    { text: '更新日志', link: '/guide/CHANGELOG', icon: 'UpdateRotation' },
  ],
  repo: 'https://gitee.com/qcyblm/vuepress-theme-vpx-next/',
  repoIcon: 'Branch',
  editLinkText: '改善当前页面',
  docsDir: '/docs/',
  docsBranch: 'main',
  contributorsText: '贡献者',
  dateOptions: {
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
    hour: '2-digit',
    minute: 'numeric',
    second: 'numeric',
  },
  archivesHome: false,
  footer: {
    licensedLink:
      'https://gitee.com/qcyblm/vuepress-theme-vpx-next/blob/main/LICENSE',
    licensed: 'MIT',
    createYear: 2021,
    origin: '青春永不落幕',
    originLink: 'https://qcyblm.gitee.io/',
    homePage: 'qcyblm.gitee.io',
  },
  lastUpdated: true,
  lastUpdatedText: '最后更新时间',
}
