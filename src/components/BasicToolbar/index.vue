<script setup>
const props = defineProps(['toolData', 'rightToolData']);

const getToolBind = (item) => {
    return {
        ...item.props,
    };
};

const getToolEvents = (item) => {
    return {
        ...item.events,
    };
};
</script>

<template>
    <div class="basic-toolbar-container">
        <div class="left-toolbar">
            <template v-for="(item, i) in props.toolData" :key="i">
                <el-button class="tool-btn" v-bind="getToolBind(item)" v-on="getToolEvents(item)">
                    {{ item.name }}
                </el-button>
            </template>
        </div>

        <div class="right-toolbar">
            <template v-for="(item, i) in props.rightToolData" :key="i">
                <el-button
                    v-if="item.name"
                    class="tool-btn"
                    v-bind="getToolBind(item)"
                    v-on="getToolEvents(item)">
                    <template v-if="item.name">
                        {{ item.name }}
                    </template>
                </el-button>

                <el-button v-else v-bind="getToolBind(item)" v-on="getToolEvents(item)" />
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.basic-toolbar-container {
    display: flex;
    height: 32px;
    position: relative;

    .left-toolbar {
        position: absolute;
        height: 100%;
        left: 0;
    }
    .right-toolbar {
        position: absolute;
        right: 0;
        height: 100%;
    }
}

/*鼠标点击后移开，恢复本身样式*/
// .el-button:focus:not(.el-button:hover) {
//     border: 1px solid var(--el-button-border-color);
//     color: var(--el-button-text-color);
//     background: var(--el-button-bg-color);
// }
</style>
