import type {
  StrokeLinecap,
  StrokeLinejoin,
  Theme,
} from '@icon-park/vue-next/lib/runtime'
import type { ThemeData } from '@vuepress/plugin-theme-data'
import type { LocaleData } from '@vuepress/shared'
import type { IconType, NavbarConfig, SidebarConfig } from '.'

export interface VpxThemePluginsOptions {
  /**
   * Enable @vuepress/plugin-active-header-links or not
   */
  activeHeaderLinks?: boolean
  /**
   * Enable @vuepress/plugin-container or not
   */
  container?: {
    tip?: boolean
    warning?: boolean
    danger?: boolean
    details?: boolean
    codeGroup?: boolean
    codeGroupItem?: boolean
  }

  /**
   * Enable @vuepress/plugin-git or not
   */
  git?: boolean

  /**
   * Enable @vuepress/plugin-medium-zoom or not
   */
  mediumZoom?: boolean

  /**
   * Enable @vuepress/plugin-nprogress or not
   */
  nprogress?: boolean

  /**
   * Enable @vuepress/plugin-prismjs or not
   */
  prismjs?: boolean
}

export interface EmojiInfo {
  name: string
  folder: string
  prefix?: string
  type?: string
  icon: string
  items: string[]
}
export type UploadImage = (image: File) => Promise<string>
export type Meta = 'nick' | 'mail' | 'link'

export type VpxThemeLocaleOptions = VpxThemeData

export type VpxThemeData = ThemeData<VpxThemeLocaleData>

export interface VpxThemeLocaleData extends LocaleData {
  /**
   * Home path of current locale
   *
   * Used as the link of back-to-home and navbar logo
   */
  home?: string

  /**
   * Navbar config
   *
   * Set to `false` to disable navbar in current locale
   */
  navbar?: false | NavbarConfig

  /**
   * Navbar logo config
   *
   * Logo to display in navbar
   */
  logo?: null | string

  /**
   * Navbar logo config for dark mode
   *
   * Logo to display in navbar in dark mode
   */
  logoDark?: null | string

  /**
   * Navbar dark mode button config
   *
   * Enable dark mode switching and display a button in navbar or not
   */
  darkMode?: boolean

  /**
   * Navbar repository config
   *
   * Used for the repository link of navbar
   */
  repo?: null | string
  repoIcon?: false | IconType
  /**
   * Navbar repository config
   *
   * Used for the repository text of navbar
   */
  repoLabel?: string

  /**
   * Navbar language selection config
   *
   * Text of the language selection dropdown
   */
  selectLanguageText?: string
  selectIcon?: false | IconType

  /**
   * Navbar language selection config
   *
   * Aria label of of the language selection dropdown
   */
  selectLanguageAriaLabel?: string

  /**
   * Navbar language selection config
   *
   * Language name of current locale
   *
   * Displayed inside the language selection dropdown
   */
  selectLanguageName?: string

  browserLocale?: boolean
  dateOptions?: {
    weekday?: 'narrow' | 'short' | 'long'
    year?: 'numeric' | '2-digit'
    month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
    day?: 'numeric' | '2-digit'
    hour?: 'numeric' | '2-digit'
    minute?: 'numeric' | '2-digit'
    second?: 'numeric' | '2-digit'
    localeMatcher?: 'lookup' | 'best fit'
    timeZone?: string
    timeZoneName?: 'short' | 'long'
    hour12?: boolean
  }

  /**
   * Sidebar config
   *
   * Set to `false` to disable sidebar in current locale
   */
  sidebar?: 'auto' | false | SidebarConfig
  toc?: boolean
  tocLevel?: number

  /**
   * Sidebar depth
   *
   * - Set to `0` to disable all levels
   * - Set to `1` to include `<h2>`
   * - Set to `2` to include `<h2>` and `<h3>`
   * - ...
   *
   * The max value depends on which headers you have extracted
   * via `markdown.extractHeaders.level`.
   *
   * The default value of `markdown.extractHeaders.level` is `[2, 3]`,
   * so the default max value of `sidebarDepth` is `2`
   */
  sidebarDepth?: number

  /**
   * Page meta - edit link config
   *
   * Whether to show 'Edit this page' or not
   */
  editLink?: boolean

  /**
   * Page meta - edit link config
   *
   * The text to replace the default 'Edit this page'
   */
  editLinkText?: string

  /**
   * Page meta - edit link config
   *
   * Pattern of edit link
   *
   * @example ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string

  /**
   * Page meta - edit link config
   *
   * Use `repo` config by default
   *
   * Set this config if your docs is placed in a different repo
   */
  docsRepo?: string

  /**
   * Page meta - edit link config
   *
   * Set this config if the branch of your docs is not 'main'
   */
  docsBranch?: string

  /**
   * Page meta - edit link config
   *
   * Set this config if your docs is placed in sub dir of your `docsRepo`
   */
  docsDir?: string

  /**
   * Page meta - last updated config
   *
   * Whether to show 'Last Updated' or not
   */
  lastUpdated?: boolean

  /**
   * Page meta - last updated config
   *
   * The text to replace the default 'Last Updated'
   */
  lastUpdatedText?: string

  /**
   * Page meta - contributors config
   *
   * Whether to show 'Contributors' or not
   */
  contributors?: boolean

  /**
   * Page meta - contributors config
   *
   * The text to replace the default 'Contributors'
   */
  contributorsText?: string

  /**
   * Custom block config
   *
   * Default title of TIP custom block
   */
  tip?: string

  /**
   * Custom block config
   *
   * Default title of WARNING custom block
   */
  warning?: string

  /**
   * Custom block config
   *
   * Default title of DANGER custom block
   */
  danger?: string

  /**
   * 404 page config
   *
   * Not Found messages for 404 page
   */
  notFound?: string[]

  /**
   * 404 page config
   *
   * Text of back-to-home link in 404 page
   */
  backToHome?: string

  /**
   * A11y text for `<OutboundLink>`
   */
  openInNewWindow?: string

  /**
   * A11y text for dark mode toggle button
   */
  toggleDarkMode?: string

  /**
   * A11y text for sidebar toggle button
   */
  toggleSidebar?: string
  newWorks?: boolean
  siteInfo?: boolean
  archivesHome?: true | boolean
  archivesTop?: string[]
  archivesFooter?: boolean
  waline?: {
    el?: string | HTMLElement
    serverURL: string
    wordLimit?: number | [number, number]
    path?: string
    meta?: Meta[]
    requiredMeta?: Meta[]
    pageSize?: number
    lang?: string
    visitor?: boolean
    dark?: string
    highlight?: boolean
    mathTagSupport?: boolean
    emoji?: (string | EmojiInfo)[]
    uploadImage?: UploadImage | boolean
    login?: 'enable' | 'disable' | 'force'
    copyright?: boolean
    locale?: {
      lang?: 'zh' | 'zh-CN' | string
      nick?: '昵称' | string
      nickError?: '昵称不能少于3个字符' | string
      mail?: '邮箱' | string
      mailError?: '请填写正确的邮件地址' | string
      link?: '网址' | string
      placeholder?: '欢迎评论' | string
      sofa?: '来发评论吧~' | string
      submit?: '提交' | string
      reply?: '回复' | string
      cancelReply?: '取消回复' | string
      comment?: '评论' | string
      more?: '加载更多...' | string
      preview?: '预览' | string
      emoji?: '表情' | string
      uploadImage?: '上传图片' | string
      seconds?: '秒前' | string
      minutes?: '分钟前' | string
      hours?: '小时前' | string
      days?: '天前' | string
      now?: '刚刚' | string
      uploading?: '正在上传' | string
      login?: '登录' | string
      logout?: '退出' | string
      admin?: '博主' | string
      word?: '字' | string
      wordHint?: '评论字数应在 $0 到 $1 字之间！\n当前字数：$2' | string
    }
  }
  footer?: {
    licensedLink?: string
    licensed?: string
    createYear?: number
    origin: string
    originLink?: string
    footerWrap?: {
      icon?: IconType
      title: string
      children?: {
        text: string
        link: string
        type?: string
      }[]
    }[]
    friendLinks?: {
      text: string
      link: string
      icon?: string
      iconDark?: string
    }[]
    homePage?: string
    record?: string
    recordLink?: string
    cyberSecurityRecord?: string
    cyberSecurityLink?: string
    socialIcons?: {
      icon: IconType
      theme?: Theme
      size?: number | string
      spin?: boolean
      fill?: string | string[]
      strokeLinecap?: StrokeLinecap
      strokeLinejoin?: StrokeLinejoin
      strokeWidth?: number
      link: string
      type?: string
    }[]
    copyright?: {
      text: string
      link?: string
    }[]
  }
}
