import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/lib/client'
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/lib/client'
import type { VpxThemeData } from '../../shared'

export const useThemeData = (): ThemeDataRef<VpxThemeData> =>
  _useThemeData<VpxThemeData>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<VpxThemeData> =>
  _useThemeLocaleData<VpxThemeData>()
