import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.scss'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App);
//全局挂载
// app.config.globalProperties.$Api=
app.use(router).use(ElementPlus, { locale: zhCn }).use(createPinia().use(piniaPersist)).mount('#app');
