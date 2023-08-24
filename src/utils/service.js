import axios from 'axios'
import { get, merge } from 'lodash-es'
import { getToken } from "./cache/cookies"

/** 登出后刷新页面（会重定向到登录页） */
function logout() {
    useUserStoreHook().logout();
    location.reload();
}

/** 创建请求实例 */
function createService() {
    // 创建axios实例
    const service = axios.create();

    // 请求拦截器
    service.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    })
    
    // 响应拦截器
    service.interceptors.response.use(function (response) {
        const res = response.data;
        return res;
    }, function (error) {
        return Promise.reject(error);
    });
    return service;
}

function createRequest(service) {
    return function (config) {
        const token =  getToken();
        const defaultConfig = {
            headers: {
                // 携带 Token
                Authorization: token ? `Bearer ${token}` : undefined,
                "Content-Type": "application/json"
            },
            timeout: 5000,
            baseURL: import.meta.env.VITE_BASE_API,
            data: {}
        };
        // 合并config，将默认配置 defaultConfig 和 当此请求的自定义配置 config 合并
        const mergeConfig = merge(defaultConfig, config);
        return service(mergeConfig);
    }
}

/**
 * 上传文件特定请求
 */
export function uploadRequest() {

}

/**
 * 下载文件特定请求
 */
export function downloadRequest() {

}

const service = createService()
export const request = createRequest(service)