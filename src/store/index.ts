import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import Api from '@/api'
import { setToken } from "@/utils/setToken"
//定义数据类型
type info = {
    username: string,
    _id: string,
    deptId: [],
    role: number,
    state: number,
    sex: string,
}
export default defineStore('userInfo', {
    state: () => {
        return {
            userInfo: <info>{},//用户信息
            roles: [], //用户类别
            states: [], //用户状态
            userListinfo: {},
            sex: [],//标题等信息
            menus: <RouteRecordRaw[]>[], //存储菜单信息
        }
    },
    persist: { // 持久化存储的方式
        enabled: true,
        strategies: [
            {
                //key的名称
                // key: 'my_user',
                //更改默认存储，我更改为localStorage
                storage: localStorage, //更改为本地存储
                // 可以选择哪些进入local存储，这样就不用全部都进去存储了
                // paths 默认是全部进去存储  ['想让哪个存储写哪个的可以']
                // paths: ['list']
            }
        ]
    },
    actions: {
        async setUserInfo(data: any): Promise<boolean> {
            let res = await Api.login(data);
            if (res) {
                const { token } = res.data;
                setToken(token);
                this.userInfo = res.data;
                return true;
            }
            return false;
        },
        //获取菜单信息
        async getMenus() {
            let res = await <RouteRecordRaw[]>(await Api.getMenu()).data;
            this.menus = res;
            // return res;
        }
    },
    getters: {
        //过滤是否是管理，是则展示全部路由信息
        FilterRouterInfo(): RouteRecordRaw[] {
            const { role } = this.userInfo;
            //管理员返回全部信息
            if (role == 0) {
                return this.menus;
            }
            // 返回部分信息
            let newMenu = this.menus.filter((item) => {
                return !item.meta?.roles;
            })
            return newMenu;

        }
    }
})
