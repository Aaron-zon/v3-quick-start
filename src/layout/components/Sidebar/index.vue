<template>
    <div class="sidebar-container">
        <!-- logo -->
        <SidebarLogo :collapse="isCollapse"></SidebarLogo>
        <!-- menu -->
        <el-scrollbar>
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="v3SidebarMenuBgColor"
                :text-color="v3SidebarMenuTextColor"
                :active-text-color="v3SidebarMenuActiveTextColor"
                :unique-opened="true"
                :collapse-transition="false"
                mode="vertical"
            >
                <SidebarItem 
                    v-for="route in permissionSrote.routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                    :is-collapse="isCollapse"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from "vue-router"
import SidebarLogo from './SidebarLogo.vue'
import SidebarItem from './SidebarItem.vue'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import { getCssVariableValue } from "@/utils"

const route = useRoute()
const permissionSrote = usePermissionStore()
const appStore = useAppStore()

const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color")
const v3SidebarMenuTextColor = getCssVariableValue("--v3-sidebar-menu-text-color")
const v3SidebarMenuActiveTextColor = getCssVariableValue("--v3-sidebar-menu-active-text-color")

onMounted(() => {
    if (!permissionSrote.routes.length) {
        permissionSrote.setRoles('admin')
    }
})

// 默认激活的菜单
const activeMenu = computed(() => {
    const { meta, path} = route
    if (meta?.activeMenu) {
        return meta.activeMenu
    }
    return path
})

// 是否展开菜单
const isCollapse = computed(() => {
    return !appStore.sidebar.opened
})
</script>

<style lang="scss" scoped>
.sidebar-container {
    @mixin tip-line {
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 100%;
            background-color: var(--v3-sidebar-menu-tip-line-bg-color);
        }
    }

    .sidebar-logo-container {
        background-color: var(--v3-sidebarlogo-bg-color);
    }
    
    .el-scrollbar {
        background-color: var(--v3-sidebar-menu-bg-color);

        .el-menu {
            width: 100%;
            border: none;
            background-color: var(--v3-sidebar-menu-bg-color);


            .sidebar-item-container {
                height: var(--v3-sidebar-menu-item-height);
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
                        color: var(--v3-sidebar-menu-active-text-color) !important;
                        @include tip-line;
                    }
                }
            }
        }
        
    }
}
</style>