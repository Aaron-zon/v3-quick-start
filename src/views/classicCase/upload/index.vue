<script setup>
import { ref, reactive } from 'vue'
import { uploadFile } from '@/api/classicCase/index.js'
import { service, request } from '@/utils/service.js'
import BasicUpload from '@/components/BasicUpload/index.vue'
const url = 'http://localhost:9993/pino/testUpload';

// 以下分别使用了BasicUpload的四种模式

/** BasicUpload 1 */
// 上传控件的实例
const basicUpload1 = ref(null);
// 上传文件的信息
const fileInfo1 = reactive({});
const mode1 = 1;
/** 由组件默认方法上传到服务器 */
const uploadFile1 = () => {
    basicUpload1.value.upload.submit();
}
/** 自定义请求上传到服务器 */
const freeUploadFile1 = async () => {
    const formData = new FormData();
    formData.append('file', fileInfo1.files[0].raw);
    const res = await uploadFile(formData);
    console.log(res);
}

/** BasicUpload 2 */
const basicUpload2 = ref(null);
const fileInfo2 = reactive({});
const mode2 = 2;
/** 由组件默认方法上传到服务器 */
const uploadFile2 = () => {
    basicUpload2.value.upload.submit();
}
/** 自定义请求上传到服务器 */
const freeUploadFile2 = async () => {
    const formData = new FormData();
    formData.append('file', fileInfo1.files);
    const res = await uploadFile(formData);
    console.log(res);
}

/** BasicUpload 3 */
const basicUpload3 = ref(null);
const fileInfo3 = reactive({});
const mode3 = 3;
/** 由组件默认方法上传到服务器 */
const uploadFile3 = () => {
    basicUpload3.value.upload.submit();
}
/** 自定义请求上传到服务器 */
const freeUploadFile3 = () => {

}

/** BasicUpload 4 */
const basicUpload4 = ref(null);
const fileInfo4 = reactive({});
const mode4 = 4;
/** 由组件默认方法上传到服务器 */
const uploadFile4 = () => {
    basicUpload4.value.upload.submit();
}
/** 自定义请求上传到服务器 */
const freeUploadFile4 = () => {

}

</script>

<template>
    <div class="upload-container app-container">
        <div class="upload-wrapper">
            <div class="mode-wrapper mode1">
                <BasicUpload ref="basicUpload1" :mode="mode1" :fileInfo="fileInfo1" :url="url" />
                <div class="btn-wrapper">
                    <el-button @click="uploadFile1">由组件默认方法上传到服务器</el-button>
                    <el-button @click="freeUploadFile1">自定义请求上传到服务器</el-button>
                </div>
            </div>

            <div class="mode-wrapper mode2">
                <BasicUpload ref="basicUpload2" :mode="mode2" :fileInfo="fileInfo2" :url="url" :limit="3" />
                <div class="btn-wrapper">
                    <el-button @click="uploadFile2">由组件默认方法上传到服务器</el-button>
                    <el-button @click="freeUploadFile2">自定义请求上传到服务器</el-button>
                </div>
            </div>

            <div class="mode-wrapper mode3">
                <BasicUpload ref="basicUpload3" :mode="mode3" :fileInfo="fileInfo3" :url="url" />
                <div class="btn-wrapper">
                    <el-button @click="uploadFile3">由组件默认方法上传到服务器</el-button>
                    <el-button @click="freeUploadFile3">自定义请求上传到服务器</el-button>
                </div>
            </div>

            <div class="mode-wrapper mode4">
                <BasicUpload ref="basicUpload4" :mode="mode4" :fileInfo="fileInfo4" :url="url" />
                <div class="btn-wrapper">
                    <el-button @click="uploadFile4">由组件默认方法上传到服务器</el-button>
                    <el-button @click="freeUploadFile4">自定义请求上传到服务器</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.upload-wrapper {
    min-height: calc(var(--v3-appmain-height) - 50px);
    background: #fff;
    padding-top: 25px;

    .mode-wrapper {
        border: 1px solid #ccc;
        margin: 25px;
        padding: 25px;
    }

    .btn-wrapper {
        margin-top: 50px;
    }
}
</style>