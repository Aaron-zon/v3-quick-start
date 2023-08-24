import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAppStore = defineStore('app', () => {
    const sidebar = reactive({
        opened: false,
        withoutAnimation: false,
    });

    // change sidebar
    const toggleSidebar = (withoutAnimation) => {
        sidebar.opened = !sidebar.opened;
        sidebar.withoutAnimation = withoutAnimation;
    }

    // close sidebar
    const closeSidebar = (withoutAnimation) => {
        sidebar.opened = false;
        sidebar.withoutAnimation = withoutAnimation;
    }

    return { sidebar, toggleSidebar, closeSidebar };
})
