<template>
  <div v-if="footer" class="page-footer">
    <div v-if="footerWrap" class="box">
      <template v-for="items in footerWrap" :key="items.title">
        <section>
          <h4>
            <IconPark v-if="items.icon" :type="items.icon" theme="filled" />
            <span>{{ items.title }}</span>
          </h4>
          <ul>
            <li v-for="item in items.children" :key="item.text">
              <a :href="item.link" target="_blank" rel="noopener noreferrer">
                {{ item.text }}
              </a>

              <span v-if="item.type">- {{ item.type }}</span>
            </li>
          </ul>
        </section>
      </template>
    </div>
    <ul v-if="friendLinks" class="friendlinks">
      <IconPark type="LinkTwo" theme="filled" />
      {{
        friendLinksText
      }}
      <li v-for="item in friendLinks" :key="item.link">
        <a :href="item.link" target="_blank" rel="noopener noreferrer">
          <img v-bind="iconObj(item)" width="16" height="16" />
          {{ item.text }}
        </a>
      </li>
    </ul>
    <div v-if="footer" class="inner">
      <ul v-if="socialIcons" class="socialIcons">
        <li v-for="item in socialIcons" :key="item.icon">
          <a
            :href="item.link"
            :title="item.type"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconPark
              :type="item.icon"
              :theme="item.theme ? item.theme : 'filled'"
              :size="item.size ? item.size : '1.5rem'"
              :spin="item.spin"
              :fill="item.fill ? item.fill : '#666'"
              :stroke-linecap="item.strokeLinecap"
              :stroke-linejoin="item.strokeLinejoin"
              :stroke-width="item.strokeWidth"
            />
          </a>
        </li>
      </ul>
      <ul class="footer">
        <li>
          Powered by
          <a
            href="https://v2.vuepress.vuejs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            VuePress
          </a>
        </li>
        <li>
          Theme by
          <a
            href="https://qcyblm.gitee.io/vuepress-theme-Vpx-next/"
            target="_blank"
            rel="noopener noreferrer"
          >
            VPX
          </a>
          is
          <a
            href="https://v2.vuepress.vuejs.org/reference/default-theme/config.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Default Theme
          </a>
          Modified by
          <a
            href="https://gitee.com/qcyblm/"
            target="_blank"
            rel="noopener noreferrer"
          >
            青春永不落幕
          </a>
          (qcyblm)
        </li>
        <li v-if="footer.licensedLink">
          <a
            :href="footer.licensedLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ footer.licensed }}
          </a>
          Licensed
        </li>
        <li>
          {{ createYear }}
          <a
            v-if="footer.originLink"
            :href="footer.originLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ postAuthor }}
          </a>
          <template v-else>{{ postAuthor }}</template>
        </li>
        <li v-if="footer.record">
          <a
            :href="footer.recordLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ footer.record }}
          </a>
        </li>
        <li v-if="footer.cyberSecurityRecord">
          <a
            :href="footer.cyberSecurityLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ footer.cyberSecurityRecord }}
          </a>
        </li>
        <li v-for="item in copyright" :key="item.text">
          <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.text }}
          </a>
          <template v-else>
            <span> {{ item.text }} </span>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconPark } from '@icon-park/vue-next/es/all'
import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { computed } from 'vue'
import type { VpxThemeNormalPageFrontmatter } from '../../shared'
import { useDarkMode, useThemeLocaleData } from '../composables'
const frontmatter = usePageFrontmatter<VpxThemeNormalPageFrontmatter>()

function iconObj(item: {
  icon?: string
  iconDark?: string
  text?: string
}): any {
  const isDarkMode = useDarkMode()
  const { icon, iconDark, text } = item
  let returnObj = {}
  if (isDarkMode.value && iconDark !== undefined) {
    returnObj = {
      src: iconDark,
      alt: text,
    }
  } else if (isDarkMode.value && !iconDark) {
    returnObj = {
      src: icon || withBase('/images/icons/default_favicon_dark.png'),
      alt: text,
    }
  } else {
    returnObj = {
      src: icon || withBase('/images/icons/default_favicon.png'),
      alt: text,
    }
  }
  return returnObj
}

const postAuthor = computed(() => {
  if (!footer) {
    return null
  }

  return footer.origin
})
const themeLocale = useThemeLocaleData()
const footer = themeLocale.value.footer

const createYear = computed(() => {
  if (!footer) {
    return null
  } else if (footer.createYear === new Date().getFullYear()) {
    return `Copyright © ${new Date().getFullYear()}`
  }

  return `© ${footer.createYear}-${new Date().getFullYear()}`
})

const footerWrap = computed(() => {
  if (!footer) {
    return null
  } else if (frontmatter.value.footerWrap === false) {
    return null
  }

  return footer.footerWrap
})

const friendLinks = computed(() => {
  if (!footer) {
    return null
  } else if (frontmatter.value.friendLinks === false) {
    return null
  }

  return footer.friendLinks
})

const siteLocale = useSiteLocaleData()
const friendLinksText = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '友情链接：'
  }

  return 'friendLinks: '
})

const socialIcons = computed(() => {
  if (!footer?.socialIcons) {
    return null
  } else if (frontmatter.value.socialIcons === false) {
    return null
  }

  return footer.socialIcons
})

const copyright = computed(() => {
  if (!footer) {
    return null
  }

  return footer.copyright
})
</script>
