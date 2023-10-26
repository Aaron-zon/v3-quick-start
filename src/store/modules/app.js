import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useAppStore = defineStore('app', () => {
    const sidebar = reactive({
        opened: false, // 收缩菜单
        withoutAnimation: false, // 动画效果
    });

    // 菜单状态修改
    const toggleSidebar = (withoutAnimation) => {
        sidebar.opened = !sidebar.opened;
        sidebar.withoutAnimation = withoutAnimation;
    };

    // close sidebar
    const closeSidebar = (withoutAnimation) => {
        sidebar.opened = false;
        sidebar.withoutAnimation = withoutAnimation;
    };

    return { sidebar, toggleSidebar, closeSidebar };
});
