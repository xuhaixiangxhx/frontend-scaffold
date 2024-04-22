import { API_CONFIG } from '../config'
import http from './index.js'
// 登录接口
export const login = (username, password) => {
    return http({
        url: API_CONFIG.loginApi,
        method: 'post',
        data: {username, password}
    })
}