<script setup>
import { ref, reactive } from 'vue'
import BasicUpload from '@/components/BasicUpload/index.vue';
import { useUpload } from './hooks/index.js';
const { url, uploadFile, freeUploadFile } = useUpload();

/** BasicUpload 单文件上传 */
// 上传控件的实例
const basicUpload = ref(null);
// 上传文件的信息
const fileInfo = reactive({});
// 模式
const mode = 1;

/** 单文件自定义请求上传到服务器 */
const freeUploadFileHandle = (fileInfo) => {
    freeUploadFile(fileInfo.files[0].raw);
};
</script>

<template>
    <h2>单文件上传</h2>
    <BasicUpload ref="basicUpload" :mode="mode" :fileInfo="fileInfo" :url="url" />
    <div class="btn-wrapper">
        <el-button @click="uploadFile(basicUpload)">默认上传</el-button>
        <el-button @click="freeUploadFileHandle(fileInfo)">上传文件</el-button>
    </div>
</template>

<style lang="scss" scoped></style>
