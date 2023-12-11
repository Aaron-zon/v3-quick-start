<script setup>
import { ref } from 'vue';
import AvatarUpload from '@/components/AvatarUpload/index.vue';

const srcData = ref(null);
/** 上传头像 */
const setAvatar = (base64) => {
    console.log('setAvatar');
    srcData.value = base64;
};
</script>

<template>
    <AvatarUpload @setAvatar="setAvatar" />
    <!-- <img :src="srcData"> -->
</template>

<style lang="scss" scoped></style>
