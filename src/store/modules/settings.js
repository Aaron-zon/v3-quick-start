import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * 布局设置
 */
export const useSettings = defineStore('settings', () => {
    // 布局模式 Top/Left
    const layoutMode = ref('Left');

    // 设置布局模式 Top/Left
    const setLayoutMode = (mode = 'Left') => {
        layoutMode.value = mode;
    };

    return { layoutMode, setLayoutMode };
});
