import { createPage } from '@vuepress/core'
import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { VpxThemeLocaleOptions, VpxThemePluginsOptions } from '../shared'
import {
  assignDefaultLocaleOptions,
  resolveActiveHeaderLinksPluginOptions,
  resolveContainerPluginOptions,
  resolveContainerPluginOptionsForCodeGroup,
  resolveContainerPluginOptionsForCodeGroupItem,
  resolveContainerPluginOptionsForDetails,
  resolveGitPluginOptions,
  resolveMediumZoomPluginOptions,
} from './utils'

export interface VpxThemeOptions extends ThemeConfig, VpxThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: VpxThemePluginsOptions
}

export const VpxTheme: Theme<VpxThemeOptions> = ({
  themePlugins = {},
  ...localeOptions
}) => {
  assignDefaultLocaleOptions(localeOptions)

  return {
    name: '@qcyblm/vuepress-theme-Vpx',

    layouts: path.resolve(__dirname, '../client/layouts'),

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),

    clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),

    // use the relative file path to generate edit link
    extendsPageData: ({ filePathRelative }) => ({ filePathRelative }),
    onPrepared: async (app) => {
      const myData = app.pages.map((page) => {
        return page
      })
      await app.writeTemp(
        'my-data.js',
        `export default ${JSON.stringify(myData)}`
      )
    },
    async onInitialized(app) {
      if (app.pages.every((page) => page.path !== '/actives.html')) {
        const actives = await createPage(app, {
          path: '/actives.html',
          frontmatter: {
            layout: 'Layout',
            editLink: false,
            lastUpdated: false,
            contributors: false,
            siteInfo: false,
            waline: false,
            title: '归档',
          },
          content: `<Actives />`,
        })
        app.pages.push(actives)
      }
    },

    plugins: [
      [
        '@vuepress/active-header-links',
        resolveActiveHeaderLinksPluginOptions(themePlugins),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(themePlugins, localeOptions, 'tip'),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(themePlugins, localeOptions, 'warning'),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptions(themePlugins, localeOptions, 'danger'),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptionsForDetails(themePlugins),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptionsForCodeGroup(themePlugins),
      ],
      [
        '@vuepress/container',
        resolveContainerPluginOptionsForCodeGroupItem(themePlugins),
      ],
      ['@vuepress/git', resolveGitPluginOptions(themePlugins, localeOptions)],
      ['@vuepress/medium-zoom', resolveMediumZoomPluginOptions(themePlugins)],
      ['@vuepress/nprogress', themePlugins.nprogress !== false],
      ['@vuepress/palette', { preset: 'sass' }],
      ['@vuepress/prismjs', themePlugins.prismjs !== false],
      ['@vuepress/theme-data', { themeData: localeOptions }],
    ],
  }
}
