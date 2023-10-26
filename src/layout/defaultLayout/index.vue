<script setup>
import LeftMode from './LeftMode.vue';
import TopMode from './TopMode.vue';
import { useSettings } from '@/store/modules/settings.js';
// 获取布局模式
const { layoutMode } = useSettings();
const settings = useSettings();

// 布局模式列表（以后考虑放在配置文件里）
const modeMap = {
    Left: LeftMode,
    Top: TopMode,
};
</script>

<template>
    <component :is="modeMap[settings.layoutMode]" />
</template>

<style lang="scss" scoped>
</style>