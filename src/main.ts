import { createApp, createVNode } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.scss'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as Icons from "@element-plus/icons-vue";
// 在main.ts注册Icon组件
const app = createApp(App);

//全局挂载

Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})
// app.config.globalProperties.$Api=
app.use(router).use(ElementPlus, { locale: zhCn }).use(createPinia().use(piniaPersist)).mount('#app');

