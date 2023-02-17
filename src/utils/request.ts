/**
 * axios 二次封装
 */
import axios from 'axios'
import config from '@/config'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from '@/utils/setToken'
import throttle from 'lodash/throttle'
import router from '../router'
//创建axios
const service = axios.create({
    baseURL: config.baseApi,
    //超时时间
    timeout: 8000,
})
//请求拦截器
service.interceptors.request.use((config) => {
    //请求头设置一个token身份令牌
    //一般会将token存在本地
    //如果有token就将将token添加到请求头中
    const token = getToken();
    if (token) {
        config.headers.Authorization = "Bearer " + token;// headers后面的名称根据后端所需的name设置
    }
    return config;

}, (error) => {
    return Promise.reject(error)
})
//响应拦截器
service.interceptors.response.use((res) => {
    // 解析出数据
    const { code, data } = res.data;

    //登录成功的情况
    if (code == 0) {
        ElMessage({
            showClose: true,
            message: data.msg,
            type: 'success',
        })
        // 返回数据
        return data;
    }
    //token 过期的情况
    /**
     * token过期message提示并返回登录页面
     * 状态码根据后端定义
     */

    if (code == 5001) {
        fn(data.msg);
        return Promise.reject('身份过期,重新登录！');
    }
    if (code == 666) {
        return data;
    }
    if (code == 4001) {
        ElMessage({
            showClose: true,
            message: data.msg,
            type: 'warning',
        })
        return Promise.reject("用户名或密码错误！")
    }
    //其他情况，直接错误信息提示，并抛出错误信息
    ElMessage({
        showClose: true,
        message: '网络错误！',
        type: 'error',
    })
    return Promise.reject('网络错误！')

}, (error) => {
    ElMessage({
        showClose: true,
        message: '网络错误！',
        type: 'error',
    })
    return Promise.reject(error)
})
let fn = throttle((msg) => {
    //错误提示
    ElMessage({
        showClose: true,
        message: msg,
        type: 'warning',
    })
    removeToken();
    router.push('/login')
}, 1000, {
    "trailing": false,
})


export default {
    //get的请求
    get(url: string, params: {} = {}) {
        return service.get(url, {
            params: params
        })
    },
    //post请求
    post(url: string, data: {} = {}) {
        return service.post(url, data)
    },
    //删除
    delete(url: string, params: {} = {}) {
        return service.delete(url, {
            params: params
        })
    },
    //put
    put(url: string, params: {} = {}) {
        return service.put(url, params)
    },
    getMap(url: string) {
        return axios.get(url);
    },
    //模拟地图信息
    CQMapInfo(url: string) {
        return axios.get(url)
    }
};

