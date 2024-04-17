import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// 导入vue router
import router from './router/index.js'

// 导入pinia
import { createPinia } from 'pinia'

// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()
app.use(router).use(pinia).use(ElementPlus)
app.mount('#app')