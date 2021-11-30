---
date: '2021-11-18'
toc: true
tocLevel: 3
---

# 扩展配置

## Locale 配置

新增 [iconpark](https://iconpark.oceanengine.com/official) 图标库，和 [Waline](https://waline.js.org/) 评论系统

移除 `@vuepress/plugin-back-to-top@next` 返回顶部按钮插件  
如需请自行重新下载官方插件安装或者克隆本主题  
进入 `\docs\.vuepress\plugins\` 目录复制粘贴本地插件 `back-to-top` 进行配置, 本地插件配置详见 [plugins](https://v2.vuepress.vuejs.org/zh/reference/config.html#plugins)

### NavItem

- 类型：
``` ts
Array<{
  icon?: false | IconType // icon 图标
}>
```
- 详情：
`actions`、 `navbar`、 `sidebar` 的左侧图标，采用 [IconPark](https://iconpark.oceanengine.com/official) 图标库
- 示例：
``` ts
export const navbar:NavbarConfig = [
    { text: '主页', link: '/', icon: 'home' },
]
```

``` yml
actions:
  - text: 关于我
    link: /about
    type: secondary
    icon: 'me'
```

### repoIcon

- 类型：`false | IconType`
- 详情：
icon 图标（默认开启）

### selectIcon

- 类型：`false | IconType`
- 默认值：`International`
- 详情：
多语言导航图标

### sidebar

- 类型：`'auto' | false | SidebarConfig`
- 详情：左侧边栏配置，默认主题值为 `auto` ，已改为 `false` 

## sidebarDepth
- 类型：`number`
- 详情：设置根据页面标题自动生成的左侧边栏的最大深度，默认主题值为 `2`，已改为 `1`

### toc

- 类型：`boolean`
- 默认值：`true`（前提开启sidebar）
- 详情：右侧边栏配置

### tocLevel
- 类型：`number`
- 默认值：`3`
- 详情：设置根据页面标题自动生成的右侧边栏的最大深度

### editLinkText

- 类型：`string`
- 默认值：  
当 `lang` 为 `cn`, `zh`, `zh-CN`, `zh-SG`, `zh-Hans` 时为 `编辑此页`  
否则为 `Edit this page in`
- 详情：  
编辑此页，链接文字，  
当 `lang` 为 `cn`, `zh`, `zh-CN`, `zh-SG`, `zh-Hans` 时为 `在 repoLabel 上编辑此页`,  
否则为 `Edit this page in repoLabel ` , `repoLabel` 详见 [repoLabel](https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#repolabel)

### browserLocale

- 类型：`boolean`
- 默认值：`false`
- 详情：是否启动日期为浏览器默认语言环境

### dateOptions

- 类型：
``` ts
Array<{
    weekday?: "narrow" | "short" | "long"
    year?: "numeric" | "2-digit"
    month?: "numeric" | "2-digit" | "narrow" | "short" | "long"
    day?: "numeric" | "2-digit"
    hour?: "numeric" | "2-digit"
    minute?: "numeric" | "2-digit"
    second?: "numeric" | "2-digit"
    localeMatcher?: "lookup" | "best fit"
    timeZone?: string
    timeZoneName?: "short" | "long"
    hour12?: boolean
}>
```
- 详情：
lastUpdated 时间戳 集成 dateOptions 扩展自定义日期，详细信息请参阅 [Date.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) 的选项参数

### waline

- [类型](https://waline.js.org/reference/client.html)
- 详情：
集成 Waline 评论，全局文章页面使用，可选，如需某个页面要关闭，请在某个页面`Frontmatter` 上添加 `waline: false`

### archivesHome

- 类型：`boolean`
- 详情：
首页是否显示 10 篇归档文章（当大于等于10篇时，会启动阅读更多按钮，进行跳转归档文章页面）和文章底部显示近期更新文章 3 篇，默认启动，如需关闭，则 `false`（本主题新增一个而外页面 `/actives.html`，归档文章按 git 时间戳进行排序，若没有 git 时间戳，可每篇文章 Frontmatter 设置 [date](https://v2.vuepress.vuejs.org/reference/frontmatter.html#date) 发布时间，进行排序，两者都无，页面为空， 本页面不可关闭）
`/actives.html` 已做成组件形式，如需修改 SEO 等信息，你可文档路进下创建一个名为 `actives.md` 的文件进行修改
``` md
<!-- 默认值 -->
---
layout: 'Layout'
editLink: false
lastUpdated: false
contributors: false
siteInfo: false
waline: false
title: '归档'
---

<Actives />
```

### archivesTop

- 类型：`string[]`
- 详情：首页置顶文章（可选，必须先启动`archivesHome`）

### archivesFooter

- 类型：`boolean`
- 详情：文章页面是否显示页脚，默认启动

### footer

- 类型：
``` ts
Array<{
    licensed?: string // 许可证名称
    licensedLink?: string // 许可证链接
    createYear?: number // 创建年份
    origin: string // 作者或组织
    originLink?: string // 作者或组织链接，文章底部版权信息本文链接首页
                        //（默认 router.path)
    footerWrap?: { // 底部栏，4列多行
        icon?: string; // title icon图标
        title: string; // 标题
        children?: {
            text: string; // 名称
            link: string; // 链接
            type?: string; // 描述
        }[];
    }[];
    friendLinks?: { // 友情链接
        text: string // 标题
        link: string // 链接
        icon?: string // 链接图标
        iconDark?: string // 链接暗黑图标
    }[];
    homePage?: string // 文章底部版权信息本文链接首页,若未设置，则取 originLink
    record?: string // ICP 备案文案
    recordLink?: string // ICP 备案指向链接
    cyberSecurityRecord?: string // 公安部备案文案
    cyberSecurityLink?: string // 公安部备案指向链接
    socialIcons?: { // 社交图标
        icon: IconType // IconPark 图标库
        theme?: Theme // IconPark 配置 ( outline | filled ) 默认 filled
        size?: number | string  // 图标大小，默认 1.5rem
        spin?: boolean //带有动画的旋转图标，默认 否
        fill?: string | string[] // 颜色，默认 #666
        strokeLinecap?: StrokeLinecap // svg 元素的stroke-linecap 
                                      // 属性 ('butt' | 'round' | 'square')，默认 round
        strokeLinejoin?: StrokeLinejoin // svg 元素的stroke-linejoin prop
                                        //  属性 ('miter' | 'round' | 'bevel')，默认 round
        strokeWidth?: number // svg 元素的stroke-width prop，默认 4
        link: string // 链接
        type?: string // 提示语
    }[];
    copyright?: { // 而外 footer 右侧文本链接
        text: string // 文本
        link?: string // 链接
    }[];
}>
```
- 详情：页脚配置信息，每个选项都是可选的

## Frontmatter

### 首页

本章节中的 Frontmatter 只会在首页中生效。

移除 `footer` 和 `footerHtml`，转移到 `themeLocal.footer`

#### heroImageDark

- 类型：`string`
- 详情：首页暗黑图片的 URL

#### actions
- 类型：
``` ts
Array<{
  text: string
  link: string
  type?: 'primary' | 'secondary'
  target?: string
  icon?: IconType
}>
```

#### features

- 类型：
``` ts
Array<{
  imgUrl?: string // 图片 link 链接（可选）
  imgUrlDark?: string // 暗黑图片 link 链接（可选）
  title: string // 标题
  details: string // 描述（支持 HTML 语法）
  link?: string // 标题链接（可选）
  target?:  '_self' | '_blank' // 默认当前页跳转
}>
```

### 普通页面

#### author

- 类型： `string`
- 详情：文章作者，默认 git 第一提交者，若未有 git 提交者，则取 themeLocal.footer.origin

#### imgUrl

- 类型： `string`
- 详情：首页归档文章左侧图片

#### toc

- 类型： `boolean`
- 默认值：`true`
- 详情：文章页面是否启动右侧边栏

#### tocLevel

- 类型：`number`
- 默认值：`3`
- 详情：设置根据页面标题自动生成的右侧边栏的最大深度

#### siteInfo

- 类型：`boolean`
- 默认值：`true`
- 详情：是否启动文章内容结尾处的文章信息版权声明模块

#### waline

- 类型： `boolean`
- 默认值：`true`
- 详情：文章页面是否启动 Waline 评论区


#### footerWrap

- 类型：`boolean`
- 详情：文章页面是否关闭底部栏

#### friendLinks

- 类型：`boolean`
- 详情：文章页面是否关闭友情链接

#### socialIcons

- 类型：`boolean`
- 详情：文章页面是否关闭页脚社交图标
