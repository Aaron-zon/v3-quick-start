<script setup>

</script>

<template>
    <div class="example-container">
        <!-- 1. 展示区 -->
        <div class="example-showcase">
            <slot name="showcase"></slot>
        </div>
        <!-- 2.功能按钮区 -->
        <div class="op-btns">

        </div>
        <!-- 3.代码区 -->
        <div class="example-source-wrapper">
            <slot name="source"></slot>
        </div>
        <!-- 4.隐藏代码按钮 -->
        <div class="example-float-control">

        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>

