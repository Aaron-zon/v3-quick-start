import { request } from '@/utils/service';

/** 获取用户详细信息 */
export function getSimpleTableApi(params) {
    return request({
        url: 'simpleTable',
        method: 'get',
        params,
    });
}
