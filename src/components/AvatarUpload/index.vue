<script setup>
import { ref } from 'vue';
const emits = defineEmits(['setAvatar']);
const srcUrl = ref('https://avatars.githubusercontent.com/u/47178158?s=400&v=4');

const handleChange = (file) => {
    const reader = new FileReader();
    // 转换为base64
    reader.readAsDataURL(file.raw);

    reader.onload = () => {
        // 读取成功,赋值给数据变量
        emits('setAvatar', reader.result);
        srcUrl.value = reader.result;
    };
};
</script>

<template>
    <el-upload
        ref="avatarUpload"
        class="avatar-upload-container"
        :auto-upload="false"
        :show-file-list="false"
        :limit="1"
        action="#"
        :on-change="handleChange">
        <el-avatar :src="srcUrl" :size="180" />
        <div class="edit-avatar">
            <el-icon><EditPen /></el-icon>
            <div class="text">编辑</div>
        </div>
    </el-upload>

    <div class="set-avatar-container"></div>
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
</style>
