<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Scrollbar from './Scrollbar.vue';
import { useTagsViewStore } from '@/store/modules/tags-view.js';

const tagsViewStore = useTagsViewStore();
const route = useRoute();

const initTags = () => {};

const addTags = () => {
    console.log(route);
    console.log(route.path);
};

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
                :to="{ path: tag.path }">
                {{ tag.meta.title }}
                <el-icon :size="12">
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