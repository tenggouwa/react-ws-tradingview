import axios from 'axios'
import Message from '@/components/message'
import api from './api'
import httpErrorHandler from './httpErrorHandler.js' // http错误处理

// 公共参数配置
const instance = axios.create({
    baseURL: '/api',
    // baseURL,
    timeout: 30000,
    // contentType: 'application/json',
    headers: {
        'content-type': 'application/json'
    },
})

// 在实例已创建后修改默认值
// 返回结果公共处理
instance.interceptors.response.use((res) => {
    if (!res) {
        return Promise.reject(res)
    }
    // 未登录状态
    if (res.data && res.data.code === 401 && window.routerHistory) {
        localStorage.userAuth = 0
        const { pathname } = window.routerHistory.location
        if (pathname.startsWith('/community') ||
            pathname.startsWith('/assetRecord')) {
            window.routerHistory.replace(`/login?backUrl=${pathname}`)
        }
    }
    if (res.data && res.data.code === 101701) {
        const { pathname } = window.routerHistory.location
        if (pathname.startsWith('/trade')) {
            window.routerHistory.replace('/tradingcontest')
        }
    }
    const errorCodes = [120032, 120033, 120034, 120035, 120036, 120037]
    if (res.data && errorCodes.includes(res.data.code)) {
        const value = res.data.msg ? res.data.msg : 0
        let msg = window.t(`errors.${res.data.code}`)
        msg = msg.replace('{value}', value)
        Message.error(`${res.data.code}: ${msg}`)
        return false
    }
    if (!res.config.unTs && res.data.code && res.data.code !== 0 && res.data.code !== 401 && res.data.code !== 101701 && res.data.code !== 86404 && res.data.code !== 101700 && res.data.code !== 120031) {
        const { pathname } = window.routerHistory.location
        if (pathname.startsWith('/trade/futures') || pathname.startsWith('/trade/spot')) {
            let aL = window.t(`errors.${res.data.code}`)
            if (!aL || aL === `errors.${res.data.code}`) aL = window.t('errors.50000')
            Message.error(`${aL}-${res.data.code}`, 'night')
        } else {
            let aL = window.t(`errors.${res.data.code}`)
            if (!aL || aL === `errors.${res.data.code}`) aL = window.t('errors.50000')
            Message.error(`${aL}-${res.data.code}`)
        }
    }
    return res.data
}, httpErrorHandler)

// 创建单个请求
function createApi(config) {
    return (data) => {
        const { lang, auth } = window.localStorage
        Object.assign(config, {
            headers: {
                'Accept-Language': lang,
                Authorization: auth || '',
            },
        })
        if (config.method === 'get') {
            return instance({
                ...config,
                params: {
                    ...data,
                    _t: Date.now()
                }
            }).catch((e) => {
                if (e) Message.error(e.message || e.msg)
                return e || {}
            })
        }
        return instance({
            ...config,
            data: {
                ...data,
            }
        }).catch((e) => {
            if (e) Message.error(e.message || e.msg)
            return e || {}
        })
    }
}
const apis = {}

Object.entries(api).forEach((item) => {
    apis[item[0]] = createApi(item[1])
})

export default apis
