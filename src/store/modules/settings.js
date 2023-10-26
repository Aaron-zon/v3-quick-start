import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettings = defineStore('settings', () => {
    const layoutMode = ref('Top');

    const setLayoutMode = (mode = 'Left') => {
        layoutMode.value = mode;
    }

    return { layoutMode, setLayoutMode }
})
