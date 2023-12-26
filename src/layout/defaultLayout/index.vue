<script setup>
import { computed } from 'vue';
import { useSettings } from '@/store/modules/settings.js';
import LeftMode from './LeftMode.vue';
import TopMode from './TopMode.vue';

// 获取布局模式
const settings = useSettings();

// 布局模式列表（以后考虑放在配置文件里）
const modeMap = {
    Left: LeftMode,
    Top: TopMode,
};

const layout = computed(() => {
    return modeMap[settings.layoutMode];
})
</script>

<template>
    <component :is="layout" />
</template>

<style lang="scss" scoped></style>
