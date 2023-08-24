import { request } from '@/utils/service'

/** 登录 */
export function loginApi(data) {
    return request({
        url: 'users/login',
        method: 'post',
        data
    })
};

/** 获取用户详细信息 */
export function getUserInfoApi() {
    return request({
        url: 'users/info',
        method: 'get'
    })
};

export function test(data) {
    return request({
        url: 'test',
        method: 'get',
        data
    })
};