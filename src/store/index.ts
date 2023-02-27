import { defineStore } from 'pinia'
import Api from '@/api'
//定义数据类型
type info = {
    username: string,
    _id: string,
    deptId: [],
    role: number,
    state: number,
    sex: string,
}
//定义返回菜单数据类型
interface menu {
    menuId: string,
    name: string,
    url: string,
    icon?: string,
    children?: menu[]
}
export default defineStore('userInfo', {
    state: () => {
        return {
            userInfo: <info>{},//用户信息
            roles: [], //用户类别
            states: [], //用户状态
            userListinfo: {},
            sex: [],//标题等信息
            menus: <menu[]>[]  //存储菜单信息
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
        setUserInfo(data: any) {
            console.log(data);

            this.userInfo = data;

        },
        //获取菜单信息
        async getMenus() {
            this.menus = await <menu[]>(await Api.getMenu()).data;
        }
    },
    getters: {
        //过滤是否是管理，是则展示全部路由信息
        FilterRouterInfo(): menu[] {
            const { role } = this.userInfo;
            //管理员返回全部信息
            if (role == 0) {
                return this.menus;
            }
            // 返回部分信息
            let newMenu = this.menus.filter((item) => {
                return item.url != "/system";
            })
            return newMenu;
        }

    }
})
