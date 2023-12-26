import { request } from '@/utils/service';
import { useUserStore } from '@/store/modules/user';


/** 登录 */
export async function loginApi(params) {
    const { data } = await request({
        url: 'users/login',
        method: 'post',
        data: params,
    })
    // 登录成功时在此处添加合适的判断用于保存token，如
    // if (data.code == '200') useUserStore().login(data);

    // 因为测试版本使用mock因此此处直接保存，不添加判断
    useUserStore().login(data);
    return data;

}

/** 获取用户详细信息 */
export function getUserInfoApi() {
    return request({
        url: 'users/info',
        method: 'get',
    });
}

export function test(data) {
    return request({
        url: 'test',
        method: 'get',
        data,
    });
}

export function getUserList(data) {
    return request({
        url: 'users/userList',
        method: 'get',
        data,
    });
}

export function setUser(data) {
    return request({
        url: 'users/user',
        method: 'put',
        data,
    });
}

export function removeUser(data) {
    return request({
        url: 'users/user',
        method: 'delete',
        data,
    });
}
