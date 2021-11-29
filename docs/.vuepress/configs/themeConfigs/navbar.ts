import type { NavbarConfig } from '@qcyblm/vuepress-theme-vpx/lib/shared'
import { version } from '../meta'

export const navbar: NavbarConfig = [
  { text: '主页', link: '/', icon: 'Home' },
  { text: '指南', link: '/guide/', icon: 'GuideBoard' },
  {
    text: `v${version}`,
    children: [
      {
        text: 'v1.x',
        link: 'https://qcyblm.gitee.io/vuepress-theme-vpx/',
      },
    ],
  },
]
