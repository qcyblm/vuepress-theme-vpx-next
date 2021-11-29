import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { IconType, NavLink, SidebarConfig } from '.'

export interface VpxThemePageData extends GitPluginPageData {
  filePathRelative: string
}

export interface VpxThemePageFrontmatter {
  home?: boolean
  navbar?: boolean
  pageClass?: string
}

export interface VpxThemeHomePageFrontmatter extends VpxThemePageFrontmatter {
  home: true
  heroImage?: string
  heroImageDark?: string
  heroAlt?: string
  heroText?: string | null
  tagline?: string | null
  actions?: {
    text: string
    link: string
    type?: 'primary' | 'secondary'
    target?: string
    icon?: IconType
  }[]
  features?: {
    imgUrl?: string
    imgUrlDark?: string
    title: string
    details: string
    link?: string
    target?: '_self' | '_blank'
  }[]
}

export interface VpxThemeNormalPageFrontmatter extends VpxThemePageFrontmatter {
  home?: false
  author?: string
  siteInfo?: boolean
  waline?: boolean
  editLink?: boolean
  lastUpdated?: boolean
  contributors?: boolean
  sidebar?: 'auto' | false | SidebarConfig
  toc?: boolean
  tocLevel?: number
  sidebarDepth?: number
  prev?: string | NavLink
  next?: string | NavLink
  footerWrap?: boolean
  friendLinks?: boolean
  socialIcons?: boolean
}
