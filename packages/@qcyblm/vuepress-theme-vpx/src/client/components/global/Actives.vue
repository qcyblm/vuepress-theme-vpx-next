<template>
  <div class="article-list">
    <ul>
      <template v-for="item in archives" :key="item.dates">
        <h3 v-if="item.datesYear.value">{{ item.datesYearText.value }}</h3>
        <h4 v-if="item.datesMonth.value">{{ item.datesMonthText.value }}</h4>
        <li>
          <RouterLink v-if="item.dates" :to="item.path">
            <span class="title">{{ item.title }}</span>
            <span>
              <span v-if="item.author">
                <IconPark type="User" theme="outline" />
                {{ item.author }}&ensp;
              </span>
              <span>
                <IconPark type="Text" theme="outline" />
                {{ item.resut.words }}&ensp;
              </span>
              <span v-if="item.date > '0000-00-00'">
                <IconPark type="Calendar" theme="outline" />
                {{ item.dates }}&ensp;
              </span>
              <span v-if="item.data.git.updatedTime > '0'">
                <IconPark type="Time" theme="outline" />
                {{
                  new Date(item.data.git.updatedTime).toLocaleString(locale, {
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })
                }}
              </span>
            </span>
          </RouterLink>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { IconPark } from '@icon-park/vue-next/es/all'
import { useSiteLocaleData } from '@vuepress/client'
import { readingTime } from 'reading-time-estimator'
import { computed } from 'vue'
import { useThemeLocaleData } from '../../composables'

const ToText = (HTML: string): string =>
  decodeURI(HTML)
    .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
    .replace(/<span class="line-number">.*?<\/span>/gi, '')
    .replace(/<[^>]+?>/g, ' ')
    .replace(/[#]\s+/g, ' ')
    .replace(/ /g, ' ')
    .replace(/>/g, ' ')

const siteLocale = useSiteLocaleData()
const themeLocale = useThemeLocaleData()
const footer = themeLocale.value.footer
const browserLocale = themeLocale.value.browserLocale
const locale: any = computed(() => {
  if (browserLocale) {
    return false
  }

  return siteLocale.value.lang
})

const archives = computed(() => {
  const myData = require('@temp/my-data')
  const res = myData.default.filter((el) => {
    return !['/', '/actives.html', '/404.html'].includes(el.path)
  })
  res.sort((prev, next) => {
    if ((prev.data.git.updatedTime, next.data.git.updatedTime)) {
      return next.data.git.updatedTime > prev.data.git.updatedTime ? 1 : -1
    }

    return next.date > prev.date ? 1 : -1
  })
  const set = new Set()
  const years = []
  const months = []
  res.forEach((element) => {
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
    const year = computed(() => {
      if (element.data.git.updatedTime > 0) {
        return new Date(element.data.git.updatedTime).toLocaleString(
          locale.value,
          {
            year: 'numeric',
          }
        )
      } else if (element.date > '0000-00-00') {
        return new Date(element.date).toLocaleString(locale.value, {
          year: 'numeric',
        })
      }

      return new Date(element.date).toLocaleString(locale.value, {
        year: 'numeric',
      })
    })
    years.push(year.value as never)
    const month = computed(() => {
      if (element.data.git.updatedTime > 0) {
        return new Date(element.data.git.updatedTime).toLocaleString(
          locale.value,
          {
            month: 'long',
          }
        )
      } else if (element.date > '0000-00-00') {
        return new Date(element.date).toLocaleString(locale.value, {
          month: 'numeric',
        })
      }

      return new Date(element.date).toLocaleString(locale.value, {
        month: 'numeric',
      })
    })
    months.push(month.value as never)
    element.datesYear = computed(() => {
      if (!set.has(year.value)) {
        set.add(year.value)
        return year.value
      }
      return null
    })
    element.datesMonth = computed(() => {
      if (!set.has(month.value)) {
        set.add(month.value)
        return month.value
      }
      return null
    })

    element.datesYearText = computed(() => {
      if (
        ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(
          siteLocale.value.lang
        )
      ) {
        return `${element.datesYear.value} ${element.yeanum} 篇文章`
      }

      return `${element.yeanum} articles in ${element.datesYear.value}`
    })
    element.datesMonthText = computed(() => {
      if (
        ['cn', 'zh', 'zh-CN', 'zh-SG', 'zh-Hans'].includes(
          siteLocale.value.lang
        )
      ) {
        return `${element.datesMonth.value} ${element.monnum} 篇文章`
      }

      return `${element.datesMonth.value} ${element.monnum} articles`
    })
    element.resut = readingTime(ToText(element.contentRendered), 300)
  })

  for (let i = 0; i < res.length; i++) {
    const yearNum = years.reduce((pre: any, item) => {
      pre[item] = pre[item] ? pre[item] + 1 : 1
      return pre
    }, {})
    const monthNum = months.reduce((pre: any, item) => {
      pre[item] = pre[item] ? pre[item] + 1 : 1
      return pre
    }, {})
    for (const yea in yearNum) {
      if (res[i].datesYear.value && res[i].datesYear.value === yea) {
        res[i].yeanum = yearNum[yea]
      }
    }
    for (const mon in monthNum) {
      if (res[i].datesMonth.value && res[i].datesMonth.value === mon) {
        res[i].monnum = monthNum[mon]
      }
    }
  }

  return res
})
</script>

<style lang="scss" scoped>
.article-list {
  ul {
    list-style: none;
    padding: 0 0 1rem;
    h3 {
      margin-left: 1rem;
      padding-bottom: var(--navbar-padding-v);
      border-bottom: 1px solid var(--c-border);
    }
    h4 {
      margin-left: 1.5rem;
    }
    li a {
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: 0.4em 0.4em 0.4em 2em;
      margin: 0.5em 3rem;
      background: var(--c-border);
      color: var(--c-text);
      border-radius: 0.5em;
      box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.06);
      transition: all 0.4s;
      .title {
        padding: 0.3rem;
        color: var(--c-text);
        font-weight: 700;
      }
      &:hover {
        box-shadow: 0 10px 20px -10px #999;
        transform: translateY(-5px);
        text-decoration: none;
        .title {
          color: var(--c-text-accent);
        }
      }
      > span:not(.title) {
        display: inline-flex;
        justify-content: right;
        margin-right: 1rem;
        padding: 0.3rem 0;
        color: var(--c-text-quote);
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .article-list {
    ul {
      h3 {
        margin-left: 0.3rem;
      }
      h4 {
        margin-left: 1rem;
      }
      li a {
        margin: 0.5em 0;
        > span:not(.title) {
          display: none;
        }
      }
    }
  }
}
</style>
