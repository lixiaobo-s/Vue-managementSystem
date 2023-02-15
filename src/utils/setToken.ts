
import userStore from '@/store/index'

export function setToken(token: string) {
    window.localStorage.setItem("token", token);
}
export function getToken() {
    return window.localStorage.getItem('token') || false;
}
//退出登录时移除token
export function removeToken() {
    const stroe = userStore();
    stroe.$reset();
    window.localStorage.removeItem('token')
}