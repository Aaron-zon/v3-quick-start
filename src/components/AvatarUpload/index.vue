<script setup>
import { ref, nextTick } from 'vue';
import { genFileId } from 'element-plus';
import Modal from '@/components/Modal/index.vue';
import { drag } from '@/utils/drag.js'
const emits = defineEmits(['setAvatar']);
const srcUrl = ref('');
const avatarUrl = ref('');
const avatarUpload = ref(null);
// https://avatars.githubusercontent.com/u/47178158?s=400&v=4
const showChangeAvatar = ref(false);

const handleChange = (file) => {
    console.log('xxx');
    const reader = new FileReader();
    // 转换为base64
    reader.readAsDataURL(file.raw);

    reader.onload = () => {
        // 读取成功,赋值给数据变量
        emits('setAvatar', reader.result);
        // srcUrl.value = reader.result;
        avatarUrl.value = reader.result;
        showChangeAvatar.value = true;

        nextTick(() => {
            drag(cropBox.value, cropContainer.value);
        })
    };

};

const handleOnlyFileExceed = (files) => {
    avatarUpload.value.clearFiles();
    const file = files[0];
    file.uid = genFileId();
    avatarUpload.value.handleStart(file);
};

const closeAvatar = () => {
    showChangeAvatar.value = false;
}

const cropContainer = ref(null);
const cropBox = ref(null);

</script>

<template>
    <el-upload
        ref="avatarUpload"
        class="avatar-upload-container"
        :auto-upload="false"
        :show-file-list="false"
        :limit="1"
        action="#"
        :on-change="handleChange"
        :on-exceed="handleOnlyFileExceed"
    >
        <el-avatar :src="srcUrl" :size="180" />
    </el-upload>

    <Modal v-if="showChangeAvatar">
        <div class="avatar-wrapper">
            <div class="header">
                <div class="title">
                    设置您的头像
                </div>
                <div class="close-btn" @click="closeAvatar">
                    <SvgIcon name="close"></SvgIcon>
                </div>
            </div>
            <div class="content">
                <img :src="avatarUrl">
                <div ref="cropContainer" class="crop-container">
                    <div ref="cropBox" class="crop-box" style="left: 0px; top: 0px; width: 200px; height: 200px;">
                        <div class="crop-outline"></div>
                        <div class="handle nw"></div>
                        <div class="handle ne"></div>
                        <div class="handle sw"></div>
                        <div class="handle se"></div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <el-button type="success">设置新的个人头像</el-button>
            </div>
        </div>
    </Modal>
</template>

<style lang="scss" scoped>
.avatar-upload-container {
    position: relative;
    cursor: pointer;

    .edit-avatar {
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 60px;
        height: 21px;
        line-height: 21px;
        position: absolute;
        bottom: 10px;
        left: 0;
        padding: 2px 4px;
        cursor: pointer;
        color: #000;

        .text {
            display: inline-block;
            vertical-align: top;
            margin-left: 3px;
        }

        .el-icon {
            margin-left: 3px;
            height: 21px;
        }
    }
}

.avatar-wrapper {
    width: 450px;
    height: 570px;
    background-color: #fff;
    height: 50%;
    border-radius: 5px;

    .header {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        line-height: 50px;
        padding-left: 10px;
        border-bottom: 1px solid #ccc;
        font-weight: 600;

        .close-btn {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }
    .content {
        height: calc(100% - 100px);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        img {
            max-width:100%; 
            max-height: 100%;
            height:auto; 
            width:auto;
            user-select: none;
        }

        .crop-container {
            position: absolute;
            overflow: hidden;
            z-index: 1;
            top: 0;
            width: 100%;
            height: 100%;

            .crop-box {
                position: absolute;
                left: 15px;
                border-radius: 50%;
                box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
            }
        }
    }
    .footer {
        height: 50px;
        width: 100%;
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
