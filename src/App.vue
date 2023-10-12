<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const locale = zhCn;
</script>

<template>
    <ElConfigProvider :locale="locale">
        <router-view></router-view>
    </ElConfigProvider>
</template>
