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

export const delUserHandler = (id) => {
    return http({
        url: API_CONFIG.deleteUserApi,
        method: 'post',
        data: {id}
    })
}

export const addUserHandler = (userForm) => {
    return http({
        url: API_CONFIG.addUserApi,
        method: 'post',
        data: userForm
    })
}

export const updateUserHandler = (userForm) => {
    return http({
        url: API_CONFIG.updateUserApi,
        method: 'post',
        data: userForm
    })
}