<template>
  <div class="theme-default-toc" :class="{ 'toc-open': isTocOpen }">
    <div class="toc-items-wrap" :class="{ 'show-toc': isTocOpen }">
      <ul class="toc-items">
        <li
          v-for="anchor in anchors"
          :key="anchor.slug"
          class="toc-item"
          :class="{
            ['toc-level-' + anchor.level]: true,
            active: `#${anchor.slug}` === hash,
          }"
          @click="isTocOpen = !isTocOpen"
        >
          <a class="toc-anchor" :href="'#' + anchor.slug">{{ anchor.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { PageHeader } from '@vuepress/shared'
import { debounce } from 'ts-debounce'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import type { VpxThemeNormalPageFrontmatter } from '../../shared'
import { useThemeLocaleData } from '../composables'

const page = usePageData()
const themeLocaleData = useThemeLocaleData()
const frontmatter = usePageFrontmatter<VpxThemeNormalPageFrontmatter>()

const tocLevel =
  (frontmatter.value.tocLevel
    ? frontmatter.value.tocLevel
    : themeLocaleData.value.tocLevel ?? 3) - 1
const resolved: PageHeader[] = []
const resolveAnchors = (
  headers: PageHeader[],
  depth = 0
): ComputedRef<PageHeader[]> => {
  if (headers.length === 0 || depth >= tocLevel) {
    return computed(() => resolved)
  }

  headers.map((header) => {
    resolved.push(header)
    if (header.children.length) {
      resolveAnchors(header.children, ++depth)
    }
    return (depth = 0)
  })

  return computed(() => resolved)
}

const anchors = resolveAnchors(page.value.headers)
const isTocOpen = ref(false)
const route = useRoute()
const hash = ref(route.hash)

let target: HTMLAnchorElement | null = null
const onScroll: any = debounce(() => {
  isTocOpen.value = false

  // get current scrollTop
  const scrollTop = Math.max(
    window.pageYOffset,
    document.documentElement.scrollTop,
    document.body.scrollTop
  )

  // get all header links
  const headerLinks: HTMLAnchorElement[] = Array.from(
    document.querySelectorAll('.toc-anchor')
  )
  // get all header anchors
  const headerAnchors: HTMLAnchorElement[] = Array.from(
    document.querySelectorAll('.header-anchor')
  )
  // filter anchors that do not have corresponding links
  const existedHeaderAnchors = headerAnchors.filter((anchor) =>
    headerLinks.some((link) => link.hash === anchor.hash)
  )
  if (scrollTop === 0 && existedHeaderAnchors.length) {
    target = existedHeaderAnchors[0]
  }

  let min = scrollTop
  for (let i = 0; i < existedHeaderAnchors.length; i++) {
    const offsetTop = existedHeaderAnchors[i].parentElement?.offsetTop ?? 0
    if (Math.abs(scrollTop - offsetTop) < min) {
      min = Math.abs(scrollTop - offsetTop)
      target = existedHeaderAnchors[i]
    }
  }

  hash.value = decodeURIComponent(target?.hash ?? '')
}, 0)

onMounted(() => {
  if (hash.value) {
    // get all header anchors
    const headerAnchors: HTMLAnchorElement[] = Array.from(
      document.querySelectorAll('.header-anchor')
    )
    for (let i = 0; i < headerAnchors.length; i++) {
      if (decodeURIComponent(headerAnchors[i].hash) === hash.value) {
        scrollTo(0, headerAnchors[i].parentElement?.offsetTop ?? 0)
      }
    }
  }

  window.addEventListener('scroll', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
