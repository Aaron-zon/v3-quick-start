import { requestUpload } from '@/utils/service';

export function uploadFile(data) {
    return requestUpload({
        url: '/testUpload',
        method: 'post',
        data,
        baseURL: import.meta.env.VITE_PROXY_API2,
    });
}

export function uploadFiles(data) {
    return requestUpload({
        url: '/uploadFiles',
        method: 'post',
        data,
        baseURL: import.meta.env.VITE_PROXY_API2,
    });
}
