import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    // todo vuetify
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    // todo pinia
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自動引入 `defineStore()`
          'defineStore',
          // 自動引入 `defineStore()` 并重新命名為 `definePiniaStore()`
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
    // todo i18n
    '@nuxtjs/i18n'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  // todo i18n setting
  i18n: {
    strategy: 'prefix',
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.ts'
      },
      {
        code: 'zh',
        iso: 'zh-TW',
        file: 'zh.ts'
      }
    ],
    defaultLocale: 'zh',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})
