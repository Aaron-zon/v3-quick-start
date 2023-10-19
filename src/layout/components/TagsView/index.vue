<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Scrollbar from './Scrollbar.vue';
import { useTagsViewStore } from '@/store/modules/tags-view.js';
import { usePermissionStore } from '@/store/modules/permission';
import path from 'path-browserify';

const tagsViewStore = useTagsViewStore();
const permissionStore = usePermissionStore();
const route = useRoute();
const router = useRouter();

// 初始化标签页面
const initTags = () => {
    const affixTags = filterAffixTags(permissionStore.routes);
    for (let tag of affixTags) {
        if (tag.name) {
            tagsViewStore.addVisitedViews(tag);
        }
    }
};

// 路由变化时
const addTags = () => {
    if (route.name) {
        // 添加新的标签页信息
        tagsViewStore.addVisitedViews(route);
    }
};

const closeSelectedTag = (route) => {
    // 删除缓存中的页面信息
    tagsViewStore.removeVisitedView(route);
    // 判断关闭的是不是当前页
    if (isActive(route)) {
        toLastView(tagsViewStore.visitedViews, route);
    }
};

// 判断是不是固定页
const isAffix = (route) => {
    return route.meta?.affix;
};

// 判断是不是当前页面
const isActive = (tag) => {
    return tag.path === route.path;
};

// 当关闭的是当前页时重定向页面
const toLastView = (visitedViews, view) => {
    // 获取最后一个tag页信息
    const latestView = visitedViews.slice(-1)[0];
    // 如果存在最后一个tag页
    if (latestView !== undefined && latestView.fullPath !== undefined) {
        // 移动到此页面
        router.push(latestView.fullPath);
    } else {
        // 如果 TagsView 全部被关闭了，则默认重定向到主页
        if (view.name === 'Dashboard') {
            // 重新加载主页
            router.push({ path: '/redirect' + view.path, query: view.query });
        } else {
            router.push('/');
        }
    }
};

// 过滤出全部的固定页面
const filterAffixTags = (routes, basePath = '/') => {
    let tags = [];
    routes.forEach((route) => {
        if (route.meta?.affix) {
            const tagPath = path.resolve(basePath, route.path);
            tags.push({
                fullPath: tagPath,
                path: tagPath,
                name: route.name,
                meta: { ...route.meta },
            });
        }
        if (route.children) {
            // 递归
            const childTags = filterAffixTags(route.children, route.path);
            if (childTags.length >= 1) {
                tags = tags.concat(childTags);
            }
        }
    });
    return tags;
};

// 监听路由变化
watch(
    route,
    () => {
        addTags();
    },
    {
        deep: true,
    }
);

onMounted(() => {
    // 初始化tags
    initTags();
    // 将当前页面添加到标签栏
    addTags();
});
</script>

<template>
    <div class="tags-view-container">
        <!-- 1.tag区域 -->
        <Scrollbar>
            <router-link
                ref="tagRefs"
                v-for="tag in tagsViewStore.visitedViews"
                :key="tag"
                class="tags-item"
                :class="isActive(tag) ? 'active' : ''"
                :to="{ path: tag.path }">
                {{ tag.meta.title }}
                <el-icon v-if="!isAffix(tag)" :size="12" @click.prevent.stop="closeSelectedTag(tag)">
                    <Close />
                </el-icon>
            </router-link>
        </Scrollbar>
        <!-- 2.功能区 -->
    </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
    height: var(--v3-tagsview-height);

    .scrollbar-container {
        .tags-item {
            display: inline-block;
            // position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid var(--v3-tagsview-tag-border-color);
            border-radius: var(--v3-tagsview-tag-border-radius);
            color: var(--v3-tagsview-tag-text-color);
            background-color: var(--v3-tagsview-tag-bg-color);
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            &:first-of-type {
                margin-left: 5px;
            }
            &:last-of-type {
                margin-right: 5px;
            }
            &.active {
                background-color: var(--v3-tagsview-tag-active-bg-color);
                color: var(--v3-tagsview-tag-active-text-color);
                border-color: var(--v3-tagsview-tag-active-border-color);
                &::before {
                    content: '';
                    background-color: var(--v3-tagsview-tag-active-before-color);
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
            .el-icon {
                margin: 0 2px;
                margin-top: -1px;
                vertical-align: middle;
                border-radius: 50%;
                &:hover {
                    background-color: var(--v3-tagsview-tag-icon-hover-bg-color);
                    color: var(--v3-tagsview-tag-icon-hover-color);
                }
            }
        }
    }
}
</style>