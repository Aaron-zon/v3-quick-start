<script setup>
const props = defineProps(['toolData']);

const getToolBind = (item) => {
    return {
        ...item.props
    }
}

const getToolEvents = (item) => {
    return {
        ...item.events
    }
}
</script>

<template>
    <div class="basic-toolbar-container">
        <template v-for="(item, i) in props.toolData" :key="i">
            <el-button class="tool-btn" v-bind="getToolBind(item)" v-on="getToolEvents(item)">{{ item.name }}</el-button>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.basic-toolbar-container {
    display: flex;
}
</style>