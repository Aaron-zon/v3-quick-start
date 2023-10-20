<script setup>
import NavigationBar from '../components/NavigationBar/index.vue';
import TagsView from '../components/TagsView/index.vue';
import Sidebar from '../components/Sidebar/index.vue';
import AppMain from '../components/AppMain/index.vue';
import useDefaultLayout from './hooks/useDefaultLayout';

/**
 * classList: 计算当前应该显示的class，来控制sidebar的显示隐藏
 */
const { classList } = useDefaultLayout();
</script>

<template>
    <div class="layout-container" :class="classList">
        <!-- left menu -->
        <Sidebar></Sidebar>

        <div class="main-container">
            <!-- header -->
            <div class="navigationBar" :class="{ 'fixed-header': false }">
                <!-- NavigationBar -->
                <NavigationBar></NavigationBar>
                <!-- TagsView -->
                <TagsView></TagsView>
            </div>
            <!-- main -->
            <AppMain></AppMain>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout-container {
    position: relative;
    height: 100%;
    width: 100%;
}
// main area
.main-container {
    transition: margin-left 0.28s;
    margin-left: var(--v3-sidebar-width);
    position: relative;

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - var(--v3-sidebar-width));
        transition: width 0.28s;
    }
}
// left menu
.sidebar-container {
    display: block;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    transition: width 0.28s;
    width: var(--v3-sidebar-width);
}
// hide situation
.hideSidebar {
    .sidebar-container {
        width: var(--v3-sidebar-hide-width);
    }

    .main-container {
        margin-left: var(--v3-sidebar-hide-width);
    }

    .fixed-header {
        width: calc(100% - var(--v3-sidebar-hide-width));
    }
}
</style>
