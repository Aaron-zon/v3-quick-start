import { requestUpload } from '@/utils/service'

export function uploadFile(data) {
    return requestUpload({
        url: '/testUpload',
        method: 'post',
        data,
    })
};