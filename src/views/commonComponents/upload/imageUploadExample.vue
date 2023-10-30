<script setup>
import { reactive } from 'vue';
import BasicUpload from '@/components/BasicUpload/index.vue';
import { useUpload } from './hooks/index.js';

const { url, uploadFile, freeUploadFile, freeUploadFiles } = useUpload();
/** BasicUpload 3 图片上传 */
// 上传文件的信息
const fileInfo3 = reactive({});
// 模式
const mode3 = 3;

/** 多文件自定义请求上传到服务器 */
const freeUploadFilesHandle = async (fileInfo) => {
    freeUploadFiles(fileInfo.files);
};
</script>

<template>
    <h2>图片上传</h2>
    <BasicUpload :mode="mode3" :fileInfo="fileInfo3" :url="url" :limit="3" />
    <div class="btn-wrapper">
        <el-button @click="freeUploadFilesHandle(fileInfo3)"
            >多文件上传</el-button
        >
    </div>
</template>

<style lang="scss" scoped></style>
