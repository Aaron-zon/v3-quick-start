<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/modules/app';
import { useUserStore } from '@/store/modules/user';
import { UserFilled } from '@element-plus/icons-vue';

import Hamburger from '../Hamburger/index.vue';
import Breadcrumb from '../Breadcrumb/index.vue';
import NavigationLogo from './NavigationLogo.vue';
import Sidebar from '../Sidebar/index.vue';
import Notify from '@/components/Notify/index.vue';

import { useSettings } from '@/store/modules/settings.js';
const { layoutMode, setLayoutMode } = useSettings();

const router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();

const isTop = computed(() => layoutMode === 'Top');
// Hamburger
const sidebar = computed(() => appStore.sidebar);
const toggleSidebar = () => {
    appStore.toggleSidebar(false);
};

// 登出
const logout = () => {
    // 清除vuex的缓存数据
    userStore.logout();
    router.push('/login');
};
</script>

<template>
    <div class="navigation-bar-container" :class="{ topLayout: isTop }">
        <template v-if="layoutMode == 'Left'">
            <!-- left menu btn -->
            <Hamburger :is-active="sidebar.opened" @toggle-click="toggleSidebar"></Hamburger>
            <!-- message btn -->
            <Breadcrumb></Breadcrumb>
        </template>

        <template v-if="layoutMode == 'Top'">
            <!-- Logo -->
            <NavigationLogo />
            <!-- Menu -->
            <Sidebar />
        </template>

        <!-- right menu -->
        <div class="right-menu">
            <!-- user btn -->
            <Notify class="right-menu-item" />
            <el-dropdown class="right-menu-item">
                <div class="right-menu-avatar">
                    <el-avatar :icon="UserFilled" :size="30" />
                    <span>{{ userStore.username }}</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">
                            <span>Logout</span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="setLayoutMode('Left')">
                            <span>Left</span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="setLayoutMode('Top')">
                            <span>Top</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navigation-bar-container {
    position: relative;
    // display: flex;
    height: var(--v3-navigationbar-height);
    overflow: hidden;
    background: var(--v3-navigationbar-background);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        display: block;
        height: 100%;
        line-height: var(--v3-navigationbar-height);
        align-items: center;
        padding: 0 15px;
        float: left;
        cursor: pointer;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }
    .breadcrumb-container {
        float: left;
        height: 100%;
        line-height: var(--v3-navigationbar-height);
    }
    .right-menu {
        display: flex;
        float: right;
        height: 100%;
        align-items: center;
        margin-right: 10px;

        // line-height: var(--v3-navigationbar-height);

        .right-menu-item {
            padding: 0 10px;
            cursor: pointer;

            .right-menu-avatar {
                display: flex;
                align-items: center;

                .el-avatar {
                    margin-right: 10px;
                }
                span {
                    font-size: 16px;
                }
            }
        }
    }

    &.topLayout {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .navigation-logo-container {
            width: var(--v3-sidebar-width);
        }

        .sidebar-container {
            flex: 1;
            :deep(.el-sub-menu) {
                &.is-active {
                    .el-sub-menu__title {
                        color: var(--v3-menu-active-color) !important;
                    }
                }
            }
            :deep(.el-menu-item) {
                &.is-active {
                    color: var(--v3-menu-active-color) !important;
                }
            }
        }
    }
}
</style>
