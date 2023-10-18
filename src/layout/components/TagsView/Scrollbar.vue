<script setup>
</script>

<template>
    <div class="scrollbar-container">
        <el-scrollbar>
            <slot />
        </el-scrollbar>
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