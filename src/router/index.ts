import routes from "./routes";
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index';
import { getToken } from '@/utils/setToken'
interface menu {
    menuId: string,
    name: string,
    url: string,
    icon?: string,
    children?: menu[]
}
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
/**
 * 
 * @param path 跳转的路由
 * @menus 全部路由信息
 */
function fn(menus: menu[], path: string): boolean {
    let arr = menus.some((item) => {
        if (!item.children) {
            return item.url == path;
        } else {
            return fn(item.children, path);
        }
    })

    return arr;
}
//前置路由
router.beforeEach((to, from, next) => {
    const userIndfoStore = store();
    //菜单信息
    let menus = userIndfoStore.FilterRouterInfo;
    const token = getToken();
    //如果已经有状态，拦截去处
    //已经登录，去的地方不是登录界面
    if (token && to.path != '/login' && to.path != '/register' && fn(menus, to.path)) {
        next();
        //有token但是去的地方是登录页面，直接，返回到首页
    } else if (token && to.path == '/login' || token && to.path == '/register') {

        next('/')
        //没有token，去的地方是login，register
    } else if (!token && to.path == '/login' || !token && to.path == '/register') {

        next();
        //其他的放行
    } else {
        if (fn(menus, to.path) || to.path == '/index') {
            next();
        } else {
            next('/');
        }
    }
})


export default router;