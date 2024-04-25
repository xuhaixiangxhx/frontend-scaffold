import { API_CONFIG } from '../config/index.js'
import http from './index.js'

//用户操作接口
export const getUserListHandler = () => {
    return http({
        url: API_CONFIG.getUserListApi,
        method: 'get',
        timeout: 2000
    })
}