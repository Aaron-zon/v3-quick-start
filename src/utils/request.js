import axios from 'axios'

const service = createService()

function createService() {
    const service = axios.create({
        baseURL: '',
        timeout: 5000
    })
    service.interceptors.request.use(function (config) {
    
        return config
    }, function (error) {
        return Promise.reject(error)
    })
    
    service.interceptors.response.use(function (response) {
        const res = response.data
    
        return res;
    }, function (error) {
        return Promise.reject(error);
    });

    return service;
}

export function uploadRequest() {

}

export function downloadRequest() {

}

// 文件下载
export default service;