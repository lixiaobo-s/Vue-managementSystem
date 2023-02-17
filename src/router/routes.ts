import { RouteRecordRaw } from 'vue-router'
import Index from '@/view/index.vue'
import Home from '@/view/home.vue'
const routers: RouteRecordRaw[] = [
    {
        path: '/',
        component: Home,
        redirect: '/index',
        children: [
            // 大屏看图
            {
                path: '/index',
                name: 'index',
                component: Index,
                meta: {
                    title: '首页'
                },
            },
            //系统管理
            {
                path: '/system',
                name: 'system',
                meta: {
                    title: '系统管理'
                },
                children: [
                    {
                        path: '/system/user/:currentPage?',
                        name: 'user',
                        component: () => import('@/view/user.vue'),
                        meta: {
                            title: '用户管理'
                        }
                    }
                ]
            }
        ]
    },



    {
        path: '/login/:userName?',
        name: 'login',
        component: () => import("@/view/Login.vue")
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("@/view/register.vue")
    },
    {
        path: "/:pathMatch(.*)", //处理未匹配到的路由页面
        redirect: "/"
    }

]

export default routers;