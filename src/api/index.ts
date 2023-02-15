import request from '@/utils/request'

export default {
    login(params: object) {
        return request.post('/users/login', params);
    },
    getMapInfo() {
        return request.getMap('https://geo.datav.aliyun.com/areas_v3/bound/500000_full.json')
    },
    CQMapInfo() {
        return request.CQMapInfo("https://www.fastmock.site/mock/22f34e05e31753b322f9c3acfed961ee/lixiaobo/cqmap");
    },
    //获取用户列表信息列表
    getUserInfo(currentPage = 1, pageSize = 5, userName = undefined, userId = undefined) {
        return request.get(`/users/getuserInfo`, {
            currentPage,
            pageSize,
            userName,
            userId
        }
        );
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
    }
}
