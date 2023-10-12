<script setup>
import { reactive } from 'vue';
import BasicUpload from '@/components/BasicUpload/index.vue';
import { useUpload } from './hooks/index.js';

const { url, uploadFile, freeUploadFile, freeUploadFiles } = useUpload();
/** BasicUpload 2 多文件上传 */
// 上传文件的信息
const fileInfo2 = reactive({});
// 模式
const mode2 = 2;

/** 多文件自定义请求上传到服务器 */
const freeUploadFilesHandle = async (fileInfo) => {
    freeUploadFiles(fileInfo.files);
};

</script>

<template>
    <h2>多文件上传</h2>
    <BasicUpload :mode="mode2" :fileInfo="fileInfo2" :url="url" :limit="3" />
    <div class="btn-wrapper">
        <el-button @click="freeUploadFilesHandle(fileInfo2)">多文件上传</el-button>
    </div>

</template>

<style lang="scss" scoped></style>
