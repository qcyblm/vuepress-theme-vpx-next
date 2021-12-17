<template>
  <div class="page-meta">
    <div v-if="siteInfo" class="meta-item declare">
      <ul class="post-copyright">
        <li>
          <strong>
            <IconPark type="User" theme="outline" />
            {{ pageAuthor }}
          </strong>
          {{ postAuthor }}
        </li>
        <li>
          <strong>
            <IconPark type="Bookmark" theme="outline" />
            {{ pageTitle }}
          </strong>
          {{ postTitle }}
        </li>
        <li>
          <strong>
            <IconPark type="LinkTwo" theme="outline" />
            {{ pageLink }}
          </strong>
          <a :href="postUrl">{{ postUrl }}</a>
        </li>
        <template v-if="footer">
          <li v-if="pageLicensed">
            <strong>&nbsp;&copy;&nbsp;{{ pageLicensed }}</strong>
            <span v-html="LicensedObj"></span>
          </li>
        </template>
      </ul>
    </div>

    <div v-if="archives && themeLocale.newWorks" class="article-list">
      <h3>
        <IconPark type="Write" theme="outline" />
        {{ newWorks }}
      </h3>
      <ol>
        <li v-for="item in archives" :key="item.dates">
          <RouterLink v-if="item.dates" :to="item.path">
            &nbsp;
            <span class="title">{{ item.title }}</span>
            <span :title="themeLocale.lastUpdatedText">
              <IconPark type="Time" theme="outline" />
              {{ item.dates }}
            </span>
          </RouterLink>
        </li>
      </ol>
    </div>

    <Waline v-if="walineObj" />

    <div v-if="editNavLink" class="meta-item edit-link">
      <NavLink class="meta-item-label" :item="editNavLink" />
    </div>

    <div v-if="lastUpdated" class="meta-item last-updated">
      <IconPark type="Time" theme="outline" />
      <span class="meta-item-label">{{ themeLocale.lastUpdatedText }}:</span>
      <ClientOnly>
        <span class="meta-item-info">{{ lastUpdated }}</span>
      </ClientOnly>
    </div>

    <div
      v-if="contributors && contributors.length"
      class="meta-item contributors"
    >
      <IconPark type="EveryUser" theme="filled" />
      <span class="meta-item-label">{{ themeLocale.contributorsText }}:</span>
      <span class="meta-item-info">
        <template v-for="(contributor, index) in contributors" :key="index">
          <span class="contributor" :title="`email: ${contributor.email}`">
            {{ contributor.name }}
          </span>
          <template v-if="index !== contributors.length - 1">,</template>
        </template>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconPark } from '@icon-park/vue-next/es/all'
import {
  usePageData,
  usePageFrontmatter,
  usePageHeadTitle,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { computed, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import type {
  NavLink as NavLinkType,
  VpxThemeNormalPageFrontmatter,
  VpxThemePageData,
} from '../../shared'
import { useThemeLocaleData } from '../composables'
import { resolveEditLink, resolveRepoType } from '../utils'
import NavLink from './NavLink.vue'
import Waline from './Waline.vue'

const pageAuthor = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '本文作者：'
  }

  return 'Author: '
})

const pageTitle = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '本文标题：'
  }

  return 'Title: '
})

const pageLink = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '本文链接：'
  }

  return 'Link: '
})

const pageLicensed = computed(() => {
  if (['MIT', 'CC0', undefined].includes(footer?.licensed)) return null

  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '版权声明：'
  }

  return 'Licensed: '
})

const newWorks = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return '近期新作'
  }

  return 'New Works: '
})

const LicensedObj = computed(() => {
  if (
    ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(siteLocale.value.lang)
  ) {
    return `本博客所有文章除特别声明外，均采用
  <a href="${footer?.licensedLink}" target="_blank" rel="noopener noreferrer">${footer?.licensed} Licensed</a>
   许可协议。转载请注明出处！`
  }

  return `All articles in this post are licensed under the
  <a href="${footer?.licensedLink}" target="_blank" rel="noopener noreferrer">${footer?.licensed} Licensed</a>
   unless otherwise stated. Please cite the source for reprinting! `
})

const archives = computed(() => {
  if (themeLocale.value.archivesHome === false) return null
  const myData = require('@temp/my-data')
  const res = myData.default.filter((el) => {
    const archivesNotSet = ['/', '/actives.html', '/404.html']
    const themeLocale = useThemeLocaleData()
    const archivesNot = `${archivesNotSet},${themeLocale.value.archivesNot}`
    return !archivesNot.split(',').includes(el.path)
  })
  res.sort((prev, next) => {
    if ((prev.data.git.updatedTime, next.data.git.updatedTime))
      return next.data.git.updatedTime > prev.data.git.updatedTime ? 1 : -1
    return next.date > prev.date ? 1 : -1
  })
  res.forEach((element) => {
    const dates = computed(() => {
      if (element.data.git.updatedTime > 0) {
        return new Date(element.data.git.updatedTime).toLocaleString(
          locale.value,
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }
        )
      } else if (element.date > '0000-00-00') {
        return new Date(element.date).toLocaleString(locale.value, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      }

      return new Date().toLocaleString(locale.value, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    })
    element.dates = dates.value
  })
  return res.slice(0, 3)
})

const walineObj = computed(() => {
  if (frontmatter.value.waline === false) {
    return null
  }

  return true
})

const useEditNavLink = (): ComputedRef<null | NavLinkType> => {
  const repo = computed(() => themeLocale.value.repo)

  const repoType = computed(() =>
    repo.value ? resolveRepoType(repo.value) : null
  )

  const repoLabel = computed(() => {
    if (themeLocale.value.repoLabel) {
      return themeLocale.value.repoLabel
    } else if (repoType.value === null) {
      return 'Source'
    }

    return repoType.value
  })

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
    } = themeLocale.value

    if (!docsRepo) {
      return null
    }

    const editLinkText = computed(() => {
      if (
        ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(
          siteLocale.value.lang
        )
      ) {
        return `在 ${repoLabel.value} 上${
          themeLocale.value.editLinkText ?? '编辑此页 '
        }`
      }

      return `${themeLocale.value.editLinkText ?? 'Edit this page in'} ${
        repoLabel.value
      }`
    })

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocale.value.editLinkPattern,
    })

    if (!editLink) {
      return null
    }

    return {
      text: editLinkText.value,
      link: editLink,
      icon: 'EditTwo',
    }
  })
}

const useLastUpdated = (): ComputedRef<null | string> => {
  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true

    if (!showLastUpdated) {
      return null
    }

    if (!page.value.git?.updatedTime) {
      return null
    }

    const updatedDate = new Date(page.value.git?.updatedTime)

    return updatedDate.toLocaleString(locale.value, dateOptions)
  })
}

const useContributors = (): ComputedRef<
  null | Required<VpxThemePageData['git']>['contributors']
> => {
  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true

    if (!showContributors) {
      return null
    }
    return page.value.git?.contributors ?? null
  })
}
const themeLocale = useThemeLocaleData()
const editNavLink = useEditNavLink()
const lastUpdated = useLastUpdated()
const contributors = useContributors()
const siteLocale = useSiteLocaleData()
const postTitle = usePageHeadTitle()
const frontmatter = usePageFrontmatter<VpxThemeNormalPageFrontmatter>()
const page = usePageData<VpxThemePageData>()
const browserLocale = themeLocale.value.browserLocale
const dateOptions = themeLocale.value.dateOptions
const footer = themeLocale.value.footer

const locale: any = computed(() => {
  if (browserLocale) {
    return false
  }

  return siteLocale.value.lang
})
const siteInfo = computed(() => {
  if (!themeLocale.value.siteInfo) {
    return null
  } else if (frontmatter.value.siteInfo === false) {
    return null
  }

  return true
})

const postAuthor = computed(() => {
  if (frontmatter.value.author) {
    return frontmatter.value.author
  } else if (lastUpdated.value && contributors.value) {
    return contributors.value[0].name
  }

  return footer?.origin
})

const route = useRoute()
const postUrl = computed(() => {
  ref()
  if (!footer) {
    return withBase(route.path)
  } else if (footer.homePage) {
    return 'https://' + footer.homePage + withBase(route.path)
  } else if (footer.originLink) {
    return 'https://' + footer.originLink + withBase(route.path)
  }

  return withBase(route.path)
})

watch(
  () => route.path,
  () => postUrl
)
</script>
