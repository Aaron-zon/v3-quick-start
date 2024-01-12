<script setup>
const props = defineProps(['title']);
</script>

<template>
    <div class="demo-svg-icon">
        <slot></slot>
        <div class="title">{{ props.title }}</div>
    </div>
</template>

<style lang="scss" scoped>
.demo-svg-icon {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;

    .title {
        margin-top: 15px;
        font-size: 12px;
        text-align: center;
    }
}
</style>