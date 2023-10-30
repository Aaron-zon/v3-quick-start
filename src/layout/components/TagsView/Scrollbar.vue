<script setup>
import { ref } from 'vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

// 滚动条组件容器
const scrollbarRef = ref(null);
// 滚动条容器内容
const scrollbarContentRef = ref(null);
// 当前滚动条距离左边的距离
let currentScrollLeft = 0;
// 每次滚动距离
const translateDistance = 200;

/** 滚动时触发 */
const scroll = ({ scrollLeft }) => {
    currentScrollLeft = scrollLeft;
};

/** 获取可能需要的宽度 */
const getWidth = () => {
    // 可滚动内容的长度
    const scrollbarContentRefWidth = scrollbarContentRef.value?.clientWidth;
    // 滚动可视区宽度
    const scrollbarRefWidth = scrollbarRef.value?.wrapRef?.clientWidth;
    // 最后剩余可滚动的宽度
    const lastDistance =
        scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft;

    return { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance };
};

/** 点击移动按钮 */
const scrollTo = (direction, distance = translateDistance) => {
    let scrollLeft = 0;
    const { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance } =
        getWidth();
    // 没有横向滚动条，直接结束
    if (scrollbarRefWidth > scrollbarContentRefWidth) return;

    if (direction === 'left') {
        scrollLeft = Math.max(0, currentScrollLeft - distance);
    } else {
        scrollLeft = Math.min(
            currentScrollLeft + distance,
            currentScrollLeft + lastDistance,
        );
    }
    scrollbarRef.value.setScrollLeft(scrollLeft);
};
</script>

<template>
    <div class="scrollbar-container">
        <el-icon class="arrow left" @click="scrollTo('left')">
            <ArrowLeft />
        </el-icon>
        <el-scrollbar ref="scrollbarRef" @scroll="scroll">
            <div ref="scrollbarContentRef" class="scrollbar-content">
                <slot />
            </div>
        </el-scrollbar>
        <el-icon class="arrow right" @click="scrollTo('right')">
            <ArrowRight />
        </el-icon>
    </div>
</template>

<style lang="scss" scoped>
.scrollbar-container {
    height: 100%;
    user-select: none;
    display: flex;
    justify-content: space-between;

    .el-scrollbar {
        flex: 1;
        white-space: nowrap;

        .scrollbar-content {
            display: inline-block;
        }
    }

    .arrow {
        width: 40px;
        height: 100%;
        cursor: pointer;
        &.left {
            box-shadow: 5px 0 5px -6px #ccc;
        }
        &.right {
            box-shadow: -5px 0 5px -6px #ccc;
        }
    }
}
</style>
