import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'
import { resolve } from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "v3-quick-start",
  description: "基于vue3的快速开发后台管理系统模板",
  base: '/v3-quick-start/',
  head: [
    [
      'link',
      { rel: 'icon', href: '../public/logo.svg' }
    ]
  ],
  locales: {

  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/' },
      { text: '演示', link: '/markdown-examples' }
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    resolve: {
      alias: {
        'vue-quick-start': resolve('./doc/docs/')
      }
    }
  }
})
