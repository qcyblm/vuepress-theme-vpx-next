import type { PageHead } from '@vuepress/client'

export const head: PageHead = [
  ['meta', { name: 'keywords', content: 'vuepress-theme-vpx,vuepress,theme,vpx' }],
  ['meta', { name: 'author', content: 'qcyblm，qcyblm@139.com' }],
  ['meta', { property: 'og:title', content: 'vuepress-theme-vpx' }],
  [
    'meta',
    {
      property: 'og:determiner',
      content: '一款基于 VuePress 开发的主题',
    },
  ],
  ['meta', { property: 'article:author', content: '青春永不落幕' }],
  ['meta', { property: 'article:tag', content: 'vuepress-theme-vpx,vuepress,theme,vpx' }],
  ['meta', { property: 'og:image', content: 'https://qcyblm.gitee.io/vuepress-theme-vpx/favicon.ico' }],
  ['meta', { itemprop: 'name', content: 'vuepress-theme-vpx' }],
  [
    'meta',
    { itemprop: 'description', content: '一款基于 VuePress 开发的主题' },
  ],
  ['meta', { itemprop: 'image', content: 'https://qcyblm.gitee.io/vuepress-theme-vpx/favicon.ico' }],
  [
    'link',
    {
      rel: 'icon',
      type: 'images/x-icon',
      href: 'https://qcyblm.gitee.io/vuepress-theme-vpx/favicon.ico',
    },
  ],
]
