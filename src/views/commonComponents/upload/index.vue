<script setup>
import { ref, reactive } from 'vue'
import BasicUpload from '@/components/BasicUpload/index.vue'
import { useUpload } from './hooks/index.js'

const url = import.meta.env.VITE_PROXY_API2 + '/testUpload';
const { uploadFile, freeUploadFile, freeUploadFiles } = useUpload();

/** 多文件自定义请求上传到服务器 */
const freeUploadFilesHandle = async (fileInfo) => {
    freeUploadFiles(fileInfo.files);
}

/** 单文件自定义请求上传到服务器 */
const freeUploadFileHandle = (fileInfo) => {
    freeUploadFile(fileInfo.files[0].raw);
}

// 以下分别使用了BasicUpload的四种模式

/** BasicUpload 1 单文件上传 */
// 上传控件的实例
const basicUpload1 = ref(null);
// 上传文件的信息
const fileInfo1 = reactive({});
// 模式
const mode1 = 1;

/** BasicUpload 2 多文件上传 */
// 上传文件的信息
const fileInfo2 = reactive({});
// 模式
const mode2 = 2;

/** BasicUpload 3 图片上传 */
// 上传文件的信息
const fileInfo3 = reactive({});
// 模式
const mode3 = 3;

/** BasicUpload 4 拖拽上传 */
// 上传文件的信息
const fileInfo4 = reactive({});
// 模式
const mode4 = 4;

</script>

<template>
    <div class="upload-container app-scroll-container">
        <div class="upload-wrapper">
            <!-- BasicUpload 1 单文件上传 -->
            <div class="mode-wrapper mode1">
                <h2>单文件上传</h2>
                <BasicUpload ref="basicUpload1" :mode="mode1" :fileInfo="fileInfo1" :url="url" />
                <div class="btn-wrapper">
                    <el-button @click="uploadFile(basicUpload1)">默认上传</el-button>
                    <el-button @click="freeUploadFileHandle(fileInfo1)">上传文件</el-button>
                </div>
            </div>

            <!-- BasicUpload 2 多文件上传 -->
            <div class="mode-wrapper mode2">
                <h2>多文件上传</h2>
                <BasicUpload :mode="mode2" :fileInfo="fileInfo2" :url="url" :limit="3" />
                <div class="btn-wrapper">
                    <el-button @click="freeUploadFilesHandle(fileInfo2)">多文件上传</el-button>
                </div>
            </div>

            <!-- BasicUpload 3 图片上传 -->
            <div class="mode-wrapper mode3">
                <h2>图片上传</h2>
                <BasicUpload :mode="mode3" :fileInfo="fileInfo3" :url="url" :limit="3" />
                <div class="btn-wrapper">
                    <el-button @click="freeUploadFilesHandle(fileInfo3)">多文件上传</el-button>
                </div>
            </div>

            <!-- BasicUpload 4 拖拽上传 -->
            <div class="mode-wrapper mode4">
                <h2>拖拽上传</h2>
                <BasicUpload :mode="mode4" :fileInfo="fileInfo4" :url="url" :limit="3" />
                <div class="btn-wrapper">
                    <el-button @click="freeUploadFilesHandle(fileInfo4)">多文件上传</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.upload-wrapper {
    min-height: calc(var(--v3-appmain-height) - 50px);
    background: #fff;
    padding: 25px 0;

    .mode-wrapper {
        border: 1px solid #ccc;
        margin: 25px;
        padding: 25px;
    }

    .btn-wrapper {
        margin-top: 20px;
    }
}
</style>