<script setup>
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const scrollTo = (direction, distance) => {
    //   let scrollLeft = 0
    //   const { scrollbarContentRefWidth, scrollbarRefWidth, lastDistance } = getWidth()
    //   // 没有横向滚动条，直接结束
    //   if (scrollbarRefWidth > scrollbarContentRefWidth) return
    //   if (direction === "left") {
    //     scrollLeft = Math.max(0, currentScrollLeft - distance)
    //   } else {
    //     scrollLeft = Math.min(currentScrollLeft + distance, currentScrollLeft + lastDistance)
    //   }
    //   scrollbarRef.value!.setScrollLeft(scrollLeft)
};
</script>

<template>
    <div class="scrollbar-container">
        <!-- <el-icon class="arrow left" @click="scrollTo('left')">
            <ArrowLeft />
        </el-icon> -->
        <el-scrollbar>
            <slot />
        </el-scrollbar>
        <!-- <el-icon class="arrow right" @click="scrollTo('right')">
            <ArrowRight />
        </el-icon> -->
    </div>
</template>
    
<style lang="scss" scoped>
.scrollbar-container {
    height: 100%;
    user-select: none;
    // display: flex;
    // justify-content: space-between;

    .el-scrollbar {
        white-space: nowrap;
    }

    // user-select: none;
    // justify-content: space-between;
    // .el-scrollbar {
    //     display: flex;
    //     .tags-item {
    //         flex: 1;
    //     }
    // }
}
</style>