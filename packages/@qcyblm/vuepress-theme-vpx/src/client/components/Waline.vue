<template>
  <div v-if="walineItem" id="waline"></div>
</template>

<script setup lang="ts">
import type { WalineInstance } from '@waline/client'
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeLocaleData } from '../composables'

const route = useRoute()
const themeLocale = useThemeLocaleData()
const walineItem = themeLocale.value.waline

let waline: WalineInstance
onMounted(() => {
  const Waline = require('@waline/client')
  if (walineItem) {
    waline = Waline({
      el: walineItem.el,
      serverURL: walineItem.serverURL,
      path: walineItem.path,
      lang: walineItem.lang,
      visitor: walineItem.visitor,
      emoji: walineItem.emoji,
      dark: walineItem.dark,
      meta: walineItem.meta,
      requiredMeta: walineItem.requiredMeta,
      login: walineItem.locale,
      wordLimit: walineItem.wordLimit,
      pageSize: walineItem.pageSize,
      uploadImage: walineItem.uploadImage,
      highlight: walineItem.highlight,
      mathTagSupport: walineItem.mathTagSupport,
      copyright: walineItem.copyright,
      locale: walineItem.locale,
    }) as WalineInstance
  }
})

onBeforeUnmount(() => {
  if (walineItem) {
    waline.destroy()
  }
})

watch(
  () => route.path,
  () => {
    if (walineItem) {
      nextTick(() =>
        waline.update({
          lang: walineItem.lang,
          locale: walineItem.locale,
        })
      )
    }
  }
)
</script>
