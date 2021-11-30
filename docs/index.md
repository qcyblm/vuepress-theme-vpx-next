---
home: true
heroImage: https://qcyblm.gitee.io/vuepress-theme-vpx/vpx.png
heroAlt: '@qcyblm/vuepress-theme-vpx'
heroText: '@qcyblm/vuepress-theme-vpx'
tagline: 一款基于 VuePress 开发的主题
actions:
  - text: 介绍
    link: /guide/
    icon: BookOne
  - text: 扩展配置
    link: /guide/configs
    type: secondary
    icon: Stretching
features:
  - title: 简洁高效
    details: 保持原有的主题风格，以较少的配置来增加较多的功能。
  - title: 高性能
    details: 为文档而来，为博客而生，打造多功能实用的文档兼博客主题。
  - title: 配置文件
    details: 支持传统 JavaScript 也支持超集 TypeScript。选者你适合的来配置吧！
---

## 快速上手

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
# 创建并进入项目目录
mkdir vuepress-starter && cd vuepress-starter

# 初始化项目
yarn init

# 在你的项目中安装
yarn add -D @vuepress/bundler-webpack@next
yarn add -D @vuepress/cli@next
yarn add -D @qcyblm/vuepress-theme-vpx@next

# 在 package.json 中添加一些 scripts
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

# 创建你的第一篇文档
mkdir docs
echo '# Hello VuePress' > docs/README.md

# 新建一个 docs/.vuepress/config.js 配置文件 或者 docs/.vuepress/config.ts 配置文件
mkdir docs/.vuepress && touch docs/.vuepress/config.js # 或者：touch docs/.vuepress/config.ts
```

  </CodeGroupItem>

  <CodeGroupItem title="PNPN">

```bash
# 创建并进入项目目录
mkdir vuepress-starter && cd vuepress-starter

# 新建一个 .npmrc 配置文件
echo 'shamefully-hoist=true' >> .npmrc

# 初始化项目
pnpm init

# 在你的项目中安装
pnpm add -D @vuepress/bundler-webpack@next
pnpm add -D @vuepress/cli@next
pnpm add -D @qcyblm/vuepress-theme-vpx@next

# 在 package.json 中添加一些 scripts
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

# 创建你的第一篇文档
mkdir docs
echo '# Hello VuePress' > docs/README.md

# 新建一个 docs/.vuepress/config.js 配置文件 或者 docs/.vuepress/config.ts 配置文件
mkdir docs/.vuepress && touch docs/.vuepress/config.js # 或者：touch docs/.vuepress/config.ts
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
# 创建并进入项目目录
mkdir vuepress-starter && cd vuepress-starter

# 初始化项目
npm init

# 在你的项目中安装
npm install -D @vuepress/bundler-webpack@next
npm install -D @vuepress/cli@next
npm install -D @qcyblm/vuepress-theme-vpx@next

# 在 package.json 中添加一些 scripts
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

# 创建你的第一篇文档
mkdir docs
echo '# Hello VuePress' > docs/README.md

# 新建一个 docs/.vuepress/config.js 配置文件 或者 docs/.vuepress/config.ts 配置文件
mkdir docs/.vuepress && touch docs/.vuepress/config.js # 或者：touch docs/.vuepress/config.ts
```

  </CodeGroupItem>
</CodeGroup>

<CodeGroup>
  <CodeGroupItem title="JavaScript" active>

``` js
// 写入配置信息
module.exports = {
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  theme: '@qcyblm/vpx',
  themeConfig: {
    logo: 'https://qcyblm.gitee.io/vuepress-theme-vpx/assets/img/logo.png',
  },
}

```

  </CodeGroupItem>

  <CodeGroupItem title="TypeScript">

``` ts
// 写入配置信息

import { defineUserConfig } from 'vuepress'
import type { VpxThemeOptions } from 'vuepress'

export default defineUserConfig<VpxThemeOptions>({
  lang: 'zh-CN',
  title: '你好， VuePress！',
  description: '这是我的第一个 VuePress 站点',
  theme: '@qcyblm/vpx',
  themeConfig: {
    logo: 'https://qcyblm.gitee.io/vuepress-theme-vpx/assets/img/logo.png',
  },
})

```

  </CodeGroupItem>
</CodeGroup>


<CodeGroup>
  <CodeGroupItem title="yarn" active>

``` sh
# 在本地启动服务器来开发你的文档网站
yarn docs:dev
```

  </CodeGroupItem>

  <CodeGroupItem title="pnpm">

``` sh
# 在本地启动服务器来开发你的文档网站
pnpm docs:dev
```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

``` sh
# 在本地启动服务器来开发你的文档网站
npm run docs:dev
```

  </CodeGroupItem>
</CodeGroup>

