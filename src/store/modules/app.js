import { defineStore } from 'pinia';
import { reactive } from 'vue';
/**
 * 菜单服务
 */
export const useAppStore = defineStore('app', () => {
    // 左侧菜单栏状态
    const sidebar = reactive({
        opened: false, // 收缩菜单
        withoutAnimation: false, // 动画效果
    });

    // 菜单状态修改
    const toggleSidebar = (withoutAnimation) => {
        sidebar.opened = !sidebar.opened;
        sidebar.withoutAnimation = withoutAnimation;
    };

    // 关闭菜单
    const closeSidebar = (withoutAnimation) => {
        sidebar.opened = false;
        sidebar.withoutAnimation = withoutAnimation;
    };

    return { sidebar, toggleSidebar, closeSidebar };
});
