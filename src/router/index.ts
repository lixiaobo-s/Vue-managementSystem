import routes from "./routes";
import { createRouter, createWebHashHistory } from 'vue-router'
import { getToken } from '@/utils/setToken'
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
//前置路由
router.beforeEach((to, from, next) => {
    const token = getToken();

    //如果已经有状态，拦截去处
    //已经登录，去的地方不是登录界面
    if (token && to.path != '/login' && to.path != '/register') {
        next()
        //有token但是去的地方是登录页面，直接，返回到首页
    } else if (token && to.path == '/login' || token && to.path == '/register') {
        next('/')
        //没有token，去的地方不是login，跳转到token
    } else if (!token && to.path == '/login' || !token && to.path == '/register') {
        next();
        //其他的放行
    } else {
        next();

    }
})


export default router;