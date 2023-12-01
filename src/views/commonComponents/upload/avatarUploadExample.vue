<script setup>
import AvatarUpload from '@/components/AvatarUpload/index.vue';

/** 上传头像 */
const setAvatar = (base64) => {
    console.log('setAvatar');
};
</script>

<template>
    <AvatarUpload @setAvatar="setAvatar" />
</template>

<style lang="scss" scoped></style>
