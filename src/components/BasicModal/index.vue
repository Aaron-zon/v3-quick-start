<script setup>
import BasicForm from '@/components/BasicForm/index.vue'
import BasicToolbar from '@/components/BasicToolbar/index.vue'

const props = defineProps(['dialogProps', 'layouts', 'dialogData', 'dialogTool']);

/** 获取dialog属性 */
const getDialogBind = () => {
    let binds = props.dialogProps?.props || {};

    // 默认设置点击遮罩不关闭弹窗
    if (!binds['close-on-click-modal']) {
        binds['close-on-click-modal'] = false;
    }

    // 默认设置标题
    if (!binds['title']) {
        binds['title'] = '弹出框'
    }
    
    return binds;
}

/** 获取dialog事件 */
const getDialogEvents = () => {
    let events = props.dialogProps?.events || {}
    return events;
}

</script>

<template>
    <el-dialog class="basic-modal-container" v-model="props.dialogProps.show" v-bind="getDialogBind()" v-on="getDialogEvents()">
        <BasicForm
            :layouts="props.layouts" 
            :modelData="props.dialogData"
        />
        <div class="toolbar-wrapper">
            <BasicToolbar :toolData="dialogTool"/>
        </div>

    </el-dialog>
</template>

<style lang="scss" scoped>
.basic-modal-container {

    .toolbar-wrapper {
        padding: 30px 0;

        .basic-toolbar-container {
            justify-content: flex-end;
        }
    }
}

</style>