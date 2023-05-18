import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import ElementPlus from 'element-plus';
import '../node_modules/element-plus/theme-chalk/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/style/index.scss';
import '@/style/stage.scss';

const app = createApp(App).use(router).use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties = {
    version:'1.0.0'
}
app.mount('#app')

