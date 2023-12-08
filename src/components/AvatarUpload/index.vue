<script setup>
import { ref, nextTick } from 'vue';
import { genFileId } from 'element-plus';
import Modal from '@/components/Modal/index.vue';
import { drag } from '@/utils/motion/drag.js'
import { dragZoom } from '@/utils/motion/dragZoom.js'

const emits = defineEmits(['setAvatar']);
const srcUrl = ref('');
const avatarUrl = ref('');
const avatarUpload = ref(null);
// https://avatars.githubusercontent.com/u/47178158?s=400&v=4
const showChangeAvatar = ref(false);

// Dom
const cropContainer = ref(null);
const cropBox = ref(null);
const avatarImage = ref(null);

/**
 * 修改上传图片
 * @param {*} file 
 */
const handleChange = (file) => {
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
            dragZoom({
                content: cropBox.value, 
                childs: cropBox.value.getElementsByClassName('handle'),
                minW: 100,
                minH: 100,
                maxW: 365,
                maxH: 365
            });
        })
    };

};

/**
 * 更换图片
 * @param {*} files 
 */
const handleOnlyFileExceed = (files) => {
    avatarUpload.value.clearFiles();
    const file = files[0];
    file.uid = genFileId();
    avatarUpload.value.handleStart(file);
};

/**
 * 关闭设置头像画面
 */
const closeAvatar = () => {
    showChangeAvatar.value = false;
}
/**
 * 点击-设置新的个人头像
 */
const generateAvatar = () => {
    const avatarInfo = {
        x: 350,
        y: 350,
        currentWidth: 100,
        currentHeight: 100,
        width: 100,
        height: 100
    }

    const canvas = document.createElement('canvas');
    canvas.width = avatarInfo.width;
    canvas.height = avatarInfo.height;
    canvas.ctx = canvas.getContext('2d');
    ctx.drawImage(
        avatarImage.value
        , avatarInfo.x
        , avatarInfo.y
        , avatarInfo.currentWidth
        , avatarInfo.currentHeight
        , 0
        , 0
        , avatarInfo.width
        , avatarInfo.height
    );
    canvas.toBlob(blob => {

    })
}
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
                <img ref="avatarImage" :src="avatarUrl">
                <div ref="cropContainer" class="crop-container">
                    <div ref="cropBox" class="crop-box" style="left: calc(50% - 175px); top: calc(50% - 175px);width: 350px; height: 350px;">
                        <div class="crop-outline">
                            <div ref="cropBoxNw" class="handle nw"></div>
                            <div  ref="cropBoxNe" class="handle ne"></div>
                            <div  ref="cropBoxSw" class="handle sw"></div>
                            <div  ref="cropBoxSe" class="handle se"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <el-button type="success" @click="generateAvatar">设置新的个人头像</el-button>
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
            user-select: none;

            .crop-box {
                position: absolute;
                left: 15px;
                border-radius: 50%;
                box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.5);
                user-select: none;

                .crop-outline {
                    .handle {
                        width: 5px;
                        height: 5px;
                        background-color: #fff;
                        position: absolute;
                        border-radius: 50%;
                        padding: 10px;
                        user-select: none;
                    }

                    .nw {
                        top: -5px;
                        left: -5px;
                        cursor: nw-resize;
                    }

                    .ne {
                        top: -5px;
                        right: -5px;
                        cursor: ne-resize;
                    }

                    .sw {
                        left: -5px;
                        bottom: -5px;
                        cursor: sw-resize;
                    }

                    .se {
                        bottom: -5px;
                        right: -5px;
                        cursor: se-resize;
                    }
                }
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
@/utils/motion/drag.js