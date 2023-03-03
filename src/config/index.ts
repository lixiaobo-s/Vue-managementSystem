
//获取当前环境类型，如果没有设置，默认生产环境
const env = import.meta.env.MODE === 'development' ? 'dev' : 'prod'

//定义相关的配置

const EnvConfig = {
    //开发环境
    dev: {
        //正式接口
        baseApi: 'http://127.0.0.1:3000',
        //测试接口
        mockApi: 'https://www.fastmock.site/mock/22f34e05e31753b322f9c3acfed961ee/lixiaobo',
    },
    // 生产环境
    prod: {
        //正式接口
        baseApi: 'http://127.0.0.1:3000',
        //测试接口
        mockApi: 'https://www.fastmock.site/mock/22f34e05e31753b322f9c3acfed961ee/lixiaobo',
    }
}
export default {
    env: env,
    mock: true,
    ...EnvConfig[env],
};