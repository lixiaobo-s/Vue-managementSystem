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
                redirect: '/system/user',
                children: [
                    {
                        path: 'user/:currentPage?',
                        name: 'user',
                        component: () => import('@/view/user.vue'),
                        meta: {
                            title: '用户管理'
                        }
                    }
                ]
            },
            //关于
            {
                path: '/about',
                name: 'about',
                meta: {
                    title: '关于'
                },
                redirect: '/about/item1',
                children: [
                    {
                        path: 'item1',
                        name: 'item1',
                        meta: {
                            title: '声明'
                        },
                        redirect: '/about/item1/item11',
                        children: [
                            {
                                path: 'item11',
                                name: 'item11',
                                meta: {
                                    title: '声明-1'
                                },
                                redirect: '/about/item1/item11/item111',
                                children: [
                                    {
                                        path: 'item111',
                                        name: 'item111',
                                        meta: {
                                            title: '声明-1-1'
                                        },
                                        component: () => import("@/view/about2.vue"),
                                    }
                                ]
                            },
                            {
                                path: 'item12',
                                name: 'item12',
                                meta: {
                                    title: '声明-2'
                                },
                                component: import('@/view/about3.vue')
                            }

                        ]
                    },
                    {
                        path: 'item2',
                        name: 'item2',
                        meta: {
                            title: '声明2'
                        },
                        component: () => import("@/view/about3.vue"),
                    }
                ]
            },
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