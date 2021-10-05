import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'
import gloableRegister from '@/global'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)
app.use(gloableRegister)
app.use(ElementPlus)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
