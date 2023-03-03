import { routers } from "./routes";
import { createRouter, createWebHashHistory } from 'vue-router'
import { getToken } from '@/utils/setToken'
import addmenu from "@/utils/addmenu";
import userInfo from '@/store/index';
const router = createRouter({
    history: createWebHashHistory(),
    routes: routers
})
let hasRouter = true;
//前置路由
router.beforeEach(async (to, from, next) => {
    const store = userInfo();
    //菜单信息
    const token = getToken();
    // //如果有token代表登录了
    if (token) {
        // 有token去登录页或者注册页返回到首页
        if (to.path == '/login' || to.path == '/register') {
            next("/");
        } else {
            //第一次登录或者刷新页面时加载动态路由
            if (hasRouter) {
                //加载路由
                addmenu();
                hasRouter = false;
                next({ ...to, replace: true })
            } else {
                //未匹配到的路由就跳转到首页
                if (to.name == null) {
                    next('/index')
                    return
                }
                //其余放行
                next();
            }

        }
    } else {
        //切换账号的情况，设置为true，登陆后会重新加载路由
        hasRouter = true;
        //没有登录，去登录或者注册界面就放行
        if (to.path == '/login' || to.path == '/register') {
            next();
            return;
        }
        //其他一切都返回到登录页
        next('/login')
    }
})
export default router;