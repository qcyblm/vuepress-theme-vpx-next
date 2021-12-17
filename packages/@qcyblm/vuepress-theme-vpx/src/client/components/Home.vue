<template>
  <main class="home" :aria-labelledby="heroText ? 'main-title' : undefined">
    <header class="hero">
      <ClientOnly>
        <img
          v-if="heroImage"
          :src="withBase(heroImage)"
          width="128"
          height="128"
          :alt="heroAlt"
        />
      </ClientOnly>
      <div>
        <p v-if="heroText" id="main-title">
          {{ heroText }}
          <small v-if="tagline" class="description">{{ tagline }}</small>
        </p>

        <section v-if="actions.length" class="actions">
          <NavLink
            v-for="action in actions"
            :key="action.text"
            class="action-button"
            :class="[action.type]"
            :item="action"
          />
        </section>
      </div>
    </header>

    <div v-if="features.length" class="features">
      <section v-for="feature in features" :key="feature.title" class="feature">
        <img v-if="feature.imgUrl" v-bind="featureImage(feature)" />
        <h2 v-if="feature.link">
          <RouterLink
            :target="feature.target ? feature.target : '_self'"
            :to="feature.link"
          >
            {{ feature.title }}
          </RouterLink>

          <OutboundLink v-if="feature.target == '_blank'" />
        </h2>
        <h2 v-else>{{ feature.title }}</h2>
        <p v-html="feature.details"></p>
      </section>
    </div>

    <div class="theme-default-content custom">
      <Content />
    </div>

    <div v-if="archives" class="archives">
      <template v-for="item in archives" :key="item.title">
        <div class="archive" :class="{ active: item.isActive }">
          <img
            v-if="item.data.frontmatter.imgUrl"
            :src="item.data.frontmatter.imgUrl"
          />
          <div>
            <h2>
              <small v-if="item.isActive">{{ top }}</small>
              <RouterLink :to="item.path">{{ item.title }}</RouterLink>
            </h2>
            <p>{{ ToText(item.contentRendered) }}</p>
            <hr size="1" noshade style="border: 1px dashed var(--c-border)" />
            <span v-if="item.author" :title="authorTip">
              <IconPark type="User" theme="outline" />
              {{ item.author }}&ensp;
            </span>
            <span :title="wordCount">
              <IconPark type="Text" theme="outline" />
              {{ item.resut.words }}&ensp;
            </span>
            <span v-if="item.date > '0000-00-00'" :title="releaseTime">
              <IconPark type="Calendar" theme="outline" />
              {{ item.dates }}&ensp;
            </span>
            <span
              v-if="item.data.git.updatedTime > '0'"
              :title="themeLocale.lastUpdatedText"
            >
              <IconPark type="Time" theme="outline" />
              {{
                new Date(item.data.git.updatedTime).toLocaleString(
                  locale,
                  dateOptions
                )
              }}
            </span>
            <RouterLink :to="item.path" class="more">{{ readMore }}</RouterLink>
          </div>
        </div>
      </template>
      <footer v-if="res.length >= '10'" class="archive">
        <h2 style="text-align: center; font-size: 1.2rem">
          <RouterLink to="/actives.html">{{ readMoreTo }}</RouterLink>
        </h2>
      </footer>
    </div>

    <PageFooter />
  </main>
</template>

<script setup lang="ts">
import { IconPark } from '@icon-park/vue-next/es/all'
import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import { readingTime } from 'reading-time-estimator'
import { computed } from 'vue'
import type { VpxThemeHomePageFrontmatter } from '../../shared'
import { useDarkMode, useThemeLocaleData } from '../composables'
import NavLink from './NavLink.vue'
import PageFooter from './PageFooter.vue'
const myData = require('@temp/my-data')
let res = myData.default.filter((el) => {
  return !['/', '/actives.html', '/404.html'].includes(el.path)
})
res.sort((prev, next) => {
  if ((prev.data.git.updatedTime, next.data.git.updatedTime)) {
    return next.data.git.updatedTime > prev.data.git.updatedTime ? 1 : -1
  }
  return next.date > prev.date ? 1 : -1
})

function ToText(HTML: string): string {
  return decodeURI(HTML.replace(/%/g, '%25'))
    .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
    .replace(/<span class="line-number">.*?<\/span>/gi, '')
    .replace(/<[^>]+?>/g, ' ')
    .replace(/[#]\s+/g, ' ')
    .replace(/ /g, ' ')
    .replace(/>/g, ' ')
}

const archives = computed(() => {
  if (!themeLocale.value.archivesHome) return null
  res.forEach((element) => {
    element.dates = new Date(element.date).toLocaleString(locale.value, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
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
    element.resut = readingTime(ToText(element.contentRendered), 300)
  })

  const archivesTop = themeLocale.value.archivesTop
  if (!archivesTop) return res
  if (archivesTop) {
    const topArticles = []
    res.forEach((element, index) => {
      archivesTop?.forEach((e) => {
        if (element.title === e) {
          element.isActive = true
          res.splice(index, 1)
          topArticles.push(element as never)
        }
      })
    })
    res = topArticles.concat(res)
  }

  return res.slice(0, 10)
})

const top = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '推荐'
  }

  return 'Top'
})

const authorTip = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '作者'
  }

  return 'Author'
})

const wordCount = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '字数统计'
  }

  return 'Word Count'
})

const releaseTime = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '发布时间'
  }

  return 'Release Time'
})

const readMore = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '阅读全文'
  }

  return 'Read more'
})

const readMoreTo = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '阅读更多'
  }

  return 'Read more'
})

const frontmatter = usePageFrontmatter<VpxThemeHomePageFrontmatter>()
const siteLocale = useSiteLocaleData()
const isDarkMode = useDarkMode()

// hero image and title
const heroImage = computed(() => {
  if (isDarkMode.value && frontmatter.value.heroImageDark !== undefined) {
    return frontmatter.value.heroImageDark
  }

  return frontmatter.value.heroImage
})
const heroText = computed(() => {
  if (frontmatter.value.heroText === null) {
    return null
  }
  return frontmatter.value.heroText || siteLocale.value.title || 'Hello'
})
const heroAlt = computed(
  () => frontmatter.value.heroAlt || heroText.value || 'hero'
)
const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null
  }
  return (
    frontmatter.value.tagline ||
    siteLocale.value.description ||
    'Welcome to your VuePress site'
  )
})

// action buttons
const actions = computed(() => {
  if (!isArray(frontmatter.value.actions)) {
    return []
  }

  return frontmatter.value.actions.map(
    ({ text, link, type = 'primary', target, icon }) => ({
      text,
      link,
      type,
      target,
      icon,
    })
  )
})

// feature list
const features = computed(() => {
  if (isArray(frontmatter.value.features)) {
    return frontmatter.value.features
  }
  return []
})

function featureImage(feature: {
  imgUrl?: string
  imgUrlDark?: string
  title: string
}): any {
  const { imgUrl, imgUrlDark } = feature
  let returnObj = {}
  if (isDarkMode.value && imgUrlDark !== undefined) {
    returnObj = {
      src: withBase(imgUrlDark),
      width: '64',
      height: '64',
      alt: feature.title,
    }
  } else if (imgUrl) {
    returnObj = {
      src: withBase(imgUrl),
      width: '64',
      height: '64',
      alt: feature.title,
    }
  }
  return returnObj
}

const themeLocale = useThemeLocaleData()
const browserLocale = themeLocale.value.browserLocale
const locale: any = computed(() => {
  if (browserLocale) {
    return false
  }

  return siteLocale.value.lang
})

const dateOptions = themeLocale.value.dateOptions
const footer = themeLocale.value.footer
</script>
