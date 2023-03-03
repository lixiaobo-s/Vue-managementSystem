import route from '@/router/index';
import userInfo from '@/store/index';
import { RouteRecordRaw } from 'vue-router'
import Home from '@/view/home.vue'
const modules = import.meta.glob('../view/**.vue');
let dyRouterName: any[] = [];
export default function filterMenu() {
    const userstore = userInfo();
    let router = userstore.FilterRouterInfo.slice(1, userstore.FilterRouterInfo.length);
    let arr = fn(router);
    arr.forEach((item) => {
        dyRouterName.push(item.name);
        //定义根路由
        let mainroute = <RouteRecordRaw>{
            path: '/',
            component: Home,
            redirect: '/index',
            children: []
        }
        mainroute.children?.push(item)
        route.addRoute(mainroute)
    })

}
//过滤掉多余数据
function fn(router: RouteRecordRaw[]) {

    let route: RouteRecordRaw[] = [];
    router.forEach((item) => {
        let obj = <RouteRecordRaw>{};
        obj.path = item.path;
        obj.name = item.name;
        obj.meta = { ...item.meta };
        //如果有子路由，就递归
        if (item.children && item.children.length > 0) {
            obj.children = fn(item.children);
            //有重定向就付给obj
            if (item.redirect) {
                obj.redirect = item.redirect;
            }
        }
        if (item.component) {
            // obj.component = ()=>import(`${item.component}`);
            obj.component = modules[`${item.component}`];
        }
        route.push(obj);
    })

    return route;
}

export function resetRouter() {
    //移除路由
    dyRouterName.forEach((item) => {
        route.removeRoute(item);
    })

}