// 封装axios
/*
    1. 封装可以简化我们接口调用的代码，可以去掉一些重复的代码
    2. 换掉Axios也是比较简单的
    3. 可以自定义拦截器
*/
import axios from 'axios'
import { API_CONFIG, CONFIG } from '../config/index.js'
import router from '../router/index.js'
const http = axios.create({
    baseURL: API_CONFIG.baseUrl,
    timeout: 5000,
})

http.interceptors.request.use(
    (config) => {
        // 获取token，添加到请求头
        const token = window.localStorage.getItem(CONFIG.TOKEN_NAME)
        config.headers[CONFIG.TOKEN_NAME] = token
        // 解决缓存问题
        if (config.method == 'get') {
            let timeStamp = (new Date()).getTime()
            if(config.params){
                config.params.timeStamp = timeStamp
            } else {
                config.params.timeStamp = {timeStamp: timeStamp}
            }
        }
        return config
    },
    (error) => {
        // 处理请求错误
        console.log(error)
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (response) => {
        console.log(response)
        // token失效
        if (response.data.status == 401) {
            // 移除本地存储的无效令牌
            window.localStorage.removeItem(CONFIG.TOKEN_NAME)
            // 跳转到登录页
            router.currentRoute.value.path != '/login' && router.replace('/login') 
        }
        return response
    },
    (error) => {
        // 处理响应错误
        console.log(error)
        return Promise.reject(error)
    }
)

export default http
/*
import axios from 'axios'
const request = (url = '', data = {}, method = "get", timeout = 5000) => {
    console.log("使用封装函数去处理请求")
    return new Promise((resolve, reject)=>{
        console.log("使用axios请求接口")
        // GET POST 
        const methodLower = method.toLowerCase() 
        if (methodLower === 'get') {
            axios({
                method: methodLower,
                params: data,
                timeout: timeout,
                url: url,
            }).then((response)=>{
                // 能正常拿到数据
                resolve(response)
            }).catch((error)=>{
                reject(error)
            })
        } else if (methodLower === "post") {
            axios({
                method: methodLower,
                data: data,
                timeout: timeout,
                url: url,
            }).then((response)=>{
                // 能正常拿到数据
                resolve(response)
            }).catch((error)=>{
                reject(error)
            })
        }
    })
}

export default request
*/