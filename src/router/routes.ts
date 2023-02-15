import { RouteRecordRaw } from 'vue-router'
import Index from '@/view/index.vue'
import Home from '@/view/home.vue'
const routers: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home/index',
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: '/home/index',
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/home/index',
                name: 'index',
                component: Index,
                meta: {
                    title: '可视化大屏'
                }
            },
            {
                path: '/home/user/:currentPage?',
                name: 'user',
                component: () => import('@/view/user.vue'),
                meta: {
                    title: '用户管理'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/view/Login.vue")
    },

]

export default routers;