<template>
    <div class="sidebar-item-container" v-if="!props.item.meta?.hidden">
        <!-- 单层 -->
        <template v-if="theOnlyOneChild.meta">
            <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
                <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
                    <SvgIcon :name="theOnlyOneChild.meta.svgIcon"></SvgIcon>
                    <span v-if="theOnlyOneChild.meta.title && !props.isCollapse">{{ theOnlyOneChild.meta.title }}</span>
                </el-menu-item>
            </SidebarItemLink>
        </template>
        <!-- 多层 -->
    </div>
</template>

<script setup>
import { onMounted, computed } from "vue"
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

// .simple-mode {
//     &.first-level {
//         :deep(.el-submenu) {
//             .el-sub-menu__icon-arrow {
//                 display: none;
//             }
//             span {
//                 visibility: hidden;
//             }
//         }
//     }
// }
</style>