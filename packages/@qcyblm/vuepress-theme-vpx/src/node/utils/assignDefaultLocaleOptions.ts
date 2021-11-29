import type { VpxThemeLocaleData, VpxThemeLocaleOptions } from '../../shared'

const defaultLocaleOptions: VpxThemeLocaleOptions = {
  // navbar
  navbar: [],
  logo: null,
  darkMode: true,
  repo: null,
  selectLanguageText: 'Languages',
  selectIcon: 'International',
  selectLanguageAriaLabel: 'Select language',

  // sidebar
  sidebar: false,
  sidebarDepth: 1,

  // page meta
  editLink: true,
  editLinkText: 'Edit this page',
  lastUpdated: true,
  lastUpdatedText: 'Last Updated',
  contributors: true,
  contributorsText: 'Contributors',
  archivesFooter: true,

  // 404 page messages
  notFound: [
    `There's nothing here.`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`,
  ],
  backToHome: 'Take me home',

  // a11y
  openInNewWindow: 'open in new window',
  toggleDarkMode: 'toggle dark mode',
  toggleSidebar: 'toggle sidebar',
}

const defaultLocaleData: VpxThemeLocaleData = {
  // navbar
  selectLanguageName: 'English',
  archivesFooter: true,
}

/**
 * Assign default options to `themeConfig`
 */
export const assignDefaultLocaleOptions = (
  localeOptions: VpxThemeLocaleOptions
): void => {
  if (!localeOptions.locales) {
    localeOptions.locales = {}
  }

  if (!localeOptions.locales['/']) {
    localeOptions.locales['/'] = {}
  }

  Object.assign(localeOptions, {
    ...defaultLocaleOptions,
    ...localeOptions,
  })

  Object.assign(localeOptions.locales['/'], {
    ...defaultLocaleData,
    ...localeOptions.locales['/'],
  })
}
