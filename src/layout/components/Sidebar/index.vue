<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SidebarLogo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';
import { usePermissionStore } from '@/store/modules/permission';
import { useAppStore } from '@/store/modules/app';
import { useSettings } from '@/store/modules/settings';
import { getCssVariableValue } from '@/utils';

const route = useRoute();
const permissionSrote = usePermissionStore();
const appStore = useAppStore();
const settings = useSettings();

const v3SidebarMenuBgColor = getCssVariableValue('--v3-sidebar-menu-bg-color');
const v3SidebarMenuTextColor = getCssVariableValue(
    '--v3-sidebar-menu-text-color',
);
const v3SidebarMenuActiveTextColor = getCssVariableValue(
    '--v3-sidebar-menu-active-text-color',
);

const isLeft = computed(() => settings.layoutMode === 'Left');
const isTop = computed(() => settings.layoutMode === 'Top');
const backgroundColor = computed(() =>
    isLeft.value ? v3SidebarMenuBgColor : undefined,
);
const textColor = computed(() =>
    isLeft.value ? v3SidebarMenuTextColor : undefined,
);
const activeColor = computed(() =>
    isLeft.value ? v3SidebarMenuActiveTextColor : undefined,
);
const sidebarMode = computed(() =>
    settings.layoutMode == 'Left' ? 'vertical' : 'horizontal',
);
// 默认激活的菜单
const activeMenu = computed(() => {
    const { meta, path } = route;
    if (meta?.activeMenu) {
        return meta.activeMenu;
    }
    return path;
});

// 是否展开菜单 false: 未展开 true：展开
const isCollapse = computed(() => {
    return !appStore.sidebar.opened;
});
//
</script>

<template>
    <div
        class="sidebar-container"
        :class="{ leftLayout: isLeft, topLayout: isTop }">
        <!-- logo -->
        <SidebarLogo
            :collapse="isCollapse"
            v-if="settings.layoutMode == 'Left'"></SidebarLogo>
        <!-- menu -->
        <el-scrollbar>
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse && !isTop"
                :background-color="backgroundColor"
                :text-color="textColor"
                :active-text-color="activeColor"
                :unique-opened="true"
                :collapse-transition="false"
                :mode="sidebarMode">
                <SidebarItem
                    v-for="route in permissionSrote.routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                    :is-collapse="isCollapse" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
    @mixin tip-line {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 100%;
            background-color: var(--v3-sidebar-menu-tip-line-bg-color);
        }
    }

    &.leftLayout {
        .el-scrollbar {
            background-color: var(--v3-sidebar-menu-bg-color);
            height: calc(100% - var(--v3-header-height));
            .el-menu {
                width: 100%;
                border: none;
                // background-color: var(--v3-sidebar-menu-bg-color);

                .sidebar-item-container {
                    min-height: var(--v3-sidebar-menu-item-height);
                }

                :deep(.el-menu-item),
                :deep(.el-sub-menu__title),
                :deep(.el-sub-menu .el-menu-item) {
                    height: var(--v3-sidebar-menu-item-height);
                    line-height: var(--v3-sidebar-menu-item-height);
                    &.is-active,
                    &:hover {
                        background-color: var(--v3-sidebar-menu-hover-bg-color);
                    }
                    display: block;
                    * {
                        vertical-align: middle;
                    }
                }
            }

            :deep(.el-menu-item) {
                &.is-active {
                    @include tip-line;
                }
            }

            .el-menu--collapse {
                :deep(.el-sub-menu) {
                    &.is-active {
                        .el-sub-menu__title {
                            color: var(
                                --v3-sidebar-menu-active-text-color
                            ) !important;
                            @include tip-line;
                        }
                    }
                }
            }
        }
    }

    &.topLayout {
        :deep(.el-scrollbar__view) {
            height: var(--v3-navigationbar-height);

            .el-menu {
                border: none;
                height: 100%;
                overflow: hidden;
            }
        }

        :deep(.el-menu-item),
        :deep(.el-sub-menu__title),
        :deep(.el-sub-menu .el-menu-item) {
            height: var(--v3-navigationbar-height);
            line-height: var(--v3-navigationbar-height);
            &.is-active,
            &:hover {
                background-color: var(--v3-sidebar-menu-hover-bg-color);
            }
            display: block;
            * {
                vertical-align: middle;
            }
        }
    }
}
</style>
