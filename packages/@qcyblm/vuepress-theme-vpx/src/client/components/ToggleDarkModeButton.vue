<template>
  <button
    class="toggle-dark-button"
    :title="themeLocale.toggleDarkMode"
    @click="toggleDarkMode"
  >
    <IconPark
      v-show="!isDarkMode"
      class="icon"
      type="Sun"
      size="20px"
      theme="filled"
    />

    <IconPark
      v-show="isDarkMode"
      class="icon"
      type="Moon"
      size="20px"
      theme="filled"
    />
  </button>
</template>

<script setup lang="ts">
import { IconPark } from '@icon-park/vue-next/es/all'
import { useDarkMode, useThemeLocaleData } from '../composables'

const themeLocale = useThemeLocaleData()
const isDarkMode = useDarkMode()

const toggleDarkMode = (): void => {
  isDarkMode.value = !isDarkMode.value
}
</script>
