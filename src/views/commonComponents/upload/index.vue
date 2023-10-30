<script setup>
import fileUploadExample from './fileUploadExample.vue';
import filesUploadExample from './filesUploadExample.vue';
import imageUploadExample from './imageUploadExample.vue';
import dragUploadExample from './dragUploadExample.vue';
import avatarUploadExample from './avatarUploadExample.vue';
</script>

<template>
    <div class="upload-container app-scroll-container">
        <div class="upload-wrapper">
            <!-- BasicUpload 1 单文件上传 -->
            <div class="mode-wrapper mode1">
                <fileUploadExample />
            </div>

            <!-- BasicUpload 2 多文件上传 -->
            <div class="mode-wrapper mode2">
                <filesUploadExample />
            </div>

            <!-- BasicUpload 3 图片上传 -->
            <div class="mode-wrapper mode3">
                <imageUploadExample />
            </div>

            <!-- BasicUpload 4 拖拽上传 -->
            <div class="mode-wrapper mode4">
                <dragUploadExample />
            </div>

            <div class="mode-wrapper avatar">
                <avatarUploadExample />
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
