<script setup>
import { ref } from 'vue';
import { genFileId } from 'element-plus';
const props = defineProps([
    'mode', // 上传控件模式
    'btnName', // 按钮名字
    'descName', // 描述

    'fileInfo', // 预备上传文件信息
    'url', // url
    'multiple', // 允许多文件上传
    'show-file-list', // 显示已上传文件
    'autoUpload', // 是否自动上传
    'disabled', // 是否禁用上传
    'limit', // 上传最大容许数
    'drag', // 是否启动拖拽上传
    'scoped-slot', // 属性改变默认的缩略图模板样式
]);
const emit = defineEmits([
    'before-upload', // 上传文件之前的钩子
    'change', // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
]);

const upload = ref(null);

const handleChange = (file, files) => {
    if (props.fileInfo) {
        props.fileInfo.files = files;
        props.fileInfo.ref = upload;
    }
    emit('change', {
        file,
        fileList: files,
    });
};

const handleOnlyFileExceed = (files) => {
    upload.value.clearFiles();
    const file = files[0];
    file.uid = genFileId();
    upload.value.handleStart(file);
};

/** 预览 */
const handlePictureCardPreview = (file) => {
    console.log('handlePictureCardPreview');
};
/** 下载 */
const handleDownload = (file) => {};
/** 删除 */
const handleRemove = (file) => {};

defineExpose({
    upload,
    handlePictureCardPreview,
});
</script>

<template>
    <div class="basice-upload-container">
        <!-- 1.单文件上传按钮 -->
        <template v-if="props.mode == 1 || props.mode == undefined">
            <el-upload
                ref="upload"
                :action="props.url || '#'"
                :disabled="props.disabled || false"
                :auto-upload="props.autoUpload || false"
                :show-file-list="props.showFileList || true"
                :limit="1"
                :on-change="handleChange"
                :on-exceed="handleOnlyFileExceed">
                <el-button type="primary">{{
                    props.btnName || '选择上传文件'
                }}</el-button>
                <template #tip>
                    <div class="el-upload__tip" v-if="props.descName">
                        {{ descName }}
                    </div>
                </template>
            </el-upload>
        </template>

        <!-- 2.多文件上传按钮 -->
        <template v-else-if="props.mode == 2">
            <el-upload
                :action="props.url || '#'"
                :auto-upload="false"
                :disabled="props.disabled || false"
                :limit="props.limit || 1"
                multiple
                :on-change="handleChange">
                <el-button type="primary">{{
                    props.btnName || '选择上传文件'
                }}</el-button>
                <template #tip>
                    <div class="el-upload__tip" v-if="props.descName">
                        {{ descName }}
                    </div>
                </template>
            </el-upload>
        </template>

        <!-- 3.缩略图上传 -->
        <template v-else-if="props.mode == 3">
            <el-upload
                ref="upload"
                :action="props.url || '#'"
                list-type="picture-card"
                :auto-upload="false"
                :limit="props.limit || 1"
                multiple
                :on-change="handleChange">
                <el-icon><Plus /></el-icon>
                <template #file="{ file }">
                    <div>
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url"
                            alt="" />
                        <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)">
                                <el-icon><zoom-in /></el-icon>
                            </span>

                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleDownload(file)">
                                <el-icon><Download /></el-icon>
                            </span>

                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)">
                                <el-icon><Delete /></el-icon>
                            </span>
                        </span>
                    </div>
                </template>
            </el-upload>
        </template>

        <!-- 4.多类型文件可拖拽上传 -->
        <template v-else-if="props.mode == 4">
            <el-upload
                drag
                :action="url || '#'"
                :auto-upload="false"
                :limit="props.limit || 1"
                multiple
                :on-change="handleChange">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">拖动文件或 <em>点击这里</em></div>
                <template #tip>
                    <div class="el-upload__tip">
                        {{ descName }}
                    </div>
                </template>
            </el-upload>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>
