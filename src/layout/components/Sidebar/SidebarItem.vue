<template>
    <div 
        class="sidebar-item-container" 
        :class="{'simple-mode': props.isCollapse, 'first-level': props.isFirstLevel}"
        v-if="!props.item.meta?.hidden" 
    >
        <!-- 单层 -->
        <!-- <template v-if="theOnlyOneChild?.meta"> -->
        <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
            <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
                <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
                    <SvgIcon v-if="theOnlyOneChild.meta.svgIcon" :name="theOnlyOneChild.meta.svgIcon"></SvgIcon>
                    <component v-else-if="theOnlyOneChild.meta.elIcon" :is="theOnlyOneChild.meta.elIcon" class="el-icon" />
                    <template v-if="theOnlyOneChild.meta.title" #title>
                        {{ theOnlyOneChild.meta.title }}
                    </template>
                </el-menu-item>
            </SidebarItemLink>
        </template>

        <!-- 多层 -->
        <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
            <template #title>
                <SvgIcon v-if="props.item.meta && props.item.meta.svgIcon" :name="props.item.meta.svgIcon" />
                <component v-else-if="props.item.meta?.elIcon" :is="props.item.meta.elIcon" class="el-icon"></component>
                <span v-if="props.item.meta && props.item.meta.title">{{ props.item.meta.title }}</span>
            </template>

            <template v-if="props.item.children">
                <sidebarItem
                    v-for="child in props.item.children"
                    :key="child.path"
                    :item="child"
                    :is-collapse="props.isCollapse"
                    :is-first-level="false"
                    :base-path="resolvePath(child.path)"
                />
            </template>
        </el-sub-menu>
    </div>
</template>

<script setup>
import { computed } from "vue"
import SidebarItemLink from './SidebarItemLink.vue'
import { isExternal } from "@/utils/validate"
import path from 'path-browserify'

const props = defineProps({
    item: {
        required: true,
    },
    isCollapse: {
        type: Boolean,
        default: false
    },
    isFirstLevel: {
        type: Boolean,
        default: true
    },
    basePath: {
        type: String,
        default: ""
    }
})

/** 是否始终显示根菜单 */
const alwaysShowRootMenu = computed(() => props.item.meta?.alwaysShow)

// Number of child nodes
const childNosesNumber = computed(() => {
    if (props.item.children) {
        const childNumber = props.item.children.filter(item => {
            return !(item.meta && item.meta.hidden)
        })
        return childNumber.length
    }
    return 0
})

const theOnlyOneChild = computed(() => {
    if (childNosesNumber.value > 1) return null

    if (props.item.children) {
        for (const child of props.item.children) {
            // Returns if there is no meta or there is a meta and hidden is false.
            if (!child.meta || !child.meta.hidden) {
                return child
            }
        }
    }
    // Returns itself when there are no child nodes.
    return { ...props.item, path: '' }
})

const resolvePath = (routePath) => {
    if (isExternal(routePath)) return routePath

    if(isExternal(props.basePath)) return props.basePath

    return path.resolve(props.basePath, routePath)
}
</script>

<style lang="scss" scoped>
.sidebar-item-link-container {
    height: 100%;
    line-height: 60px;

    span {
        color: #fff;
    }
}
.svg-icon {
    min-width: 1em;
    margin-right: 12px;
    font-size: 18px;
}

.el-icon {
    width: 1em;
    margin-right: 12px;
    font-size: 18px;
}

.simple-mode {
    &.first-level {
        :deep(.el-sub-menu) {
            .el-sub-menu__icon-arrow {
                display: none;
            }
            span {
                visibility: hidden;
            }
        }
    }
}
</style>