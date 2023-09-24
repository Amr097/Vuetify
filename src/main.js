import './assets/main.scss'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import veeValidatePlugin from './plugins/validation'
import { auth } from './services/firebase'

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(veeValidatePlugin, {})
    app.mount('#app')
  }
})
