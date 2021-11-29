import type { ActiveHeaderLinksPluginOptions } from '@vuepress/plugin-active-header-links'
import type { VpxThemePluginsOptions } from '../../shared'

/**
 * Resolve options for @vuepress/plugin-active-header-links
 */
export const resolveActiveHeaderLinksPluginOptions = (
  themePlugins: VpxThemePluginsOptions
): ActiveHeaderLinksPluginOptions | boolean => {
  if (themePlugins?.activeHeaderLinks === false) {
    return false
  }

  return {
    headerLinkSelector: 'a.sidebar-item',
    headerAnchorSelector: '.header-anchor',
  }
}
