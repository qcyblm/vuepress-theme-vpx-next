<template>
  <main class="page">
    <slot name="top" />
    <div class="theme-default-content-wrap">
      <div class="leftWrap">
        <div class="theme-default-content">
          <template v-for="item in archives" :key="item.dates">
            <header v-if="item.dates" class="page-info">
              <span>
                <IconPark type="Hourglass" theme="outline" />
                {{ item.resut.text }}
              </span>
              <span>
                <IconPark type="Calendar" theme="outline" />
                {{ item.dates }}
              </span>
              <span v-if="walineItem?.visitor">
                <IconPark type="Fire" theme="outline" />
                <span :id="withBase(route.path)" class="waline-visitor-count">
                </span>
              </span>
              <span>
                <IconPark type="Text" theme="outline" />
                {{ item.resut.words }}
              </span>
              <span>
                <IconPark type="User" theme="outline" />
                {{ item.author }}
              </span>
            </header>
          </template>
          <Content />
        </div>

        <PageMeta />

        <PageNav />

        <PageFooter v-if="themeLocale.archivesFooter" />
      </div>
      <div v-if="shouldShowToc" class="rightWrap">
        <PageToc />
      </div>
    </div>
    <slot name="bottom" />
  </main>
</template>

<script setup lang="ts">
import { IconPark } from '@icon-park/vue-next/es/all'
import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { readingTime } from 'reading-time-estimator'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { VpxThemeNormalPageFrontmatter } from '../../shared'
import { useThemeLocaleData } from '../composables'
import PageFooter from './PageFooter.vue'
import PageMeta from './PageMeta.vue'
import PageNav from './PageNav.vue'
import PageToc from './PageToc.vue'

const ToText = (HTML: string): string =>
  decodeURI(HTML)
    .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
    .replace(/<span class="line-number">.*?<\/span>/gi, '')
    .replace(/<[^>]+?>/g, ' ')
    .replace(/[#]\s+/g, ' ')
    .replace(/ /g, ' ')
    .replace(/>/g, ' ')

const route = useRoute()
const siteLocale = useSiteLocaleData()
const themeLocale = useThemeLocaleData()
const walineItem = themeLocale.value.waline
const footer = themeLocale.value.footer
const browserLocale = themeLocale.value.browserLocale

const shouldShowToc = computed(() => {
  const themeLocaleData = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<VpxThemeNormalPageFrontmatter>()
  const page = usePageData()
  const headers = computed(() => page.value.headers)
  return (
    headers.value.length &&
    themeLocaleData.value.toc !== false &&
    frontmatter.value.toc !== false
  )
})

const archives = computed(() => {
  const myData = require('@temp/my-data')
  const res = myData.default.filter((el) => {
    return !['/', '/actives.html', '/404.html'].includes(el.path)
  })
  res.forEach((element) => {
    const locale: any = computed(() => {
      if (browserLocale) {
        return false
      }

      return siteLocale.value.lang
    })
    const author = computed(() => {
      if (element.data.frontmatter.author) {
        return element.data.frontmatter.author
      } else if (element.data.git.updatedTime) {
        return element.data.git.contributors[0].name
      }

      return footer?.origin
    })
    element.author = author.value
    const dates = computed(() => {
      if (element.date > '0000-00-00') {
        return new Date(element.date).toLocaleString(locale.value, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      } else if (element.data.git.updatedTime > 0) {
        return new Date(element.data.git.updatedTime).toLocaleString(
          locale.value,
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }
        )
      }

      return new Date().toLocaleString(locale.value, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    })
    element.dates = dates.value
    const resutLang = computed(() => {
      if (
        ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(
          siteLocale.value.lang
        )
      ) {
        return readingTime(ToText(element.contentRendered), 300, 'cn')
      }

      return readingTime(ToText(element.contentRendered), 300, 'en')
    })
    element.resut = resutLang.value
  })
  const url = route.path
  let obj = {}
  res.forEach((element, index) => {
    if (element.path === url) {
      obj = element
      res.splice(index, 1)
    }
  })
  res.unshift(obj)
  watch(
    () => route.path,
    () => url
  )
  return res.slice(0, 1)
})
</script>
