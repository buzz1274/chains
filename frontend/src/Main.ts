import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia, type Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { definePreset } from '@primeuix/themes'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Material from '@primeuix/themes/material'

import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia: Pinia = createPinia()
const themePreset = definePreset(Material, {})

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: themePreset,
    options: {
      darkModeSelector: false,
    },
  },
})
app.use(ToastService)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
