import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import veeValidatePlugin from './plugins/validation'
import './services/firebase'

import App from './App.vue'
//import router from './router'

const app = createApp(App)

app.use(createPinia())
//app.use(router)
app.use(veeValidatePlugin, {})

app.mount('#app')
