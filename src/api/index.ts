import request from '@/utils/request'
export default {
    login(params: object) {
        return request.post('/users/login', params);
    },
    //注册
    register(data: any) {
        return request.put('/users/addUser', data);
    },
    //请求菜单信息
    getMenu() {
        return request.get('/menus/getmenus');
    },
    getMapInfo() {
        return request.getMap('https://geo.datav.aliyun.com/areas_v3/bound/500000_full.json')
    },
    CQMapInfo() {
        return request.CQMapInfo("https://www.fastmock.site/mock/22f34e05e31753b322f9c3acfed961ee/lixiaobo/cqmap");
    },
    //获取用户列表信息列表
    getUserInfo(currentPage = 1, pageSize = 5, userName: string, userId: string) {
        type params = {
            currentPage: number,
            pageSize: number,
            userName?: string,
            userId?: string,
        }
        let obj: params = {
            currentPage,
            pageSize,
        }
        if (userName != '') {
            obj.userName = userName;
        }
        if (userId != '') {
            obj.userId = userId;
        }
        return request.get(`/users/getuserInfo`, obj);
    },
    //获取标题消息等
    getUserRole() {
        return request.get('/users/getRole');
    },
    //更新数据
    updatedUser(data: any) {
        return request.put("/users/updataUser", data)
    },
    deleteUser(userid: string) {
        return request.delete('/users/deleteUser', { userid });
    },
    //批量删除
    deleteUserMany(userIds: any) {
        return request.put('/users/deleteUserMany', userIds);
    }
}
