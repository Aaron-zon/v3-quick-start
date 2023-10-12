import { uploadFile, uploadFiles } from '@/api/classicCase/index.js';

export const useUpload = () => {
    // 基础url
    const url = import.meta.env.VITE_PROXY_API2 + '/testUpload';

    /** 由组件默认方法上传到服务器 */
    const defaultUploadFile = (ref) => {
        debugger;
        ref.upload.submit();
    };

    /** 自定义请求上传到服务器 单文件 */
    const freeUploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await uploadFile(formData);
        console.log(res);
        return res;
    };

    /** 自定义请求上传到服务器 多文件 */
    const freeUploadFiles = async (files) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append(`file${i + 1}`, files[i].raw);
        }
        const res = await uploadFiles(formData);
        console.log(res);
        return res;
    };

    return {
        url,
        uploadFile: defaultUploadFile,
        freeUploadFile,
        freeUploadFiles,
    };
};
