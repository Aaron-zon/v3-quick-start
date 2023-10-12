<script setup>
import { ref, onMounted } from 'vue';
import BasicForm from '@/components/BasicForm/index.vue';
import BasicToolbar from '@/components/BasicToolbar/index.vue';

const props = defineProps(['dialogProps', 'layouts', 'dialogData', 'dialogTool', 'rules']);
const emit = defineEmits(['confirm', 'cancel']);
const basicDialog = ref(null);
const basicFormRef = ref({});
const toolData = ref([
    {
        name: '取消',
        events: {
            click: () => {
                // 调用父组件事件
                emit('cancel');
                // 调用属性中的取消事件
                props.dialogProps.cancel && props.dialogProps.cancel();
                // 关闭当前弹出框
                props.dialogProps.show = false;
            },
        },
    },
    {
        name: '确定',
        props: {
            type: 'primary',
        },
        events: {
            click: () => {
                // 调用父组件事件
                emit('confirm');
                // 调用属性中的确定事件
                props.dialogProps.confirm && props.dialogProps.confirm();
            },
        },
    },
]);

/** 获取dialog属性 */
const getDialogBind = () => {
    let binds = props.dialogProps?.props || {};

    // 默认设置点击遮罩不关闭弹窗
    if (!binds['close-on-click-modal']) {
        binds['close-on-click-modal'] = false;
    }

    // 默认设置标题
    if (!binds['title']) {
        binds['title'] = '弹出框';
    }

    return binds;
};

/** 获取dialog事件 */
const getDialogEvents = () => {
    let events = props.dialogProps?.events || {};
    return events;
};

onMounted(() => {
    if (props.dialogTool) {
        toolData.value = props.dialogTool;
    }
    props.dialogProps.dialog = {
        ref: basicDialog.value,
        formRef: basicFormRef.value.formRef,
    };
    props.dialogProps.dialog = basicFormRef.value;
});
</script>

<template>
    <el-dialog
        class="basic-modal-container"
        v-model="props.dialogProps.show"
        v-bind="getDialogBind()"
        v-on="getDialogEvents()">
        <BasicForm
            :basicFormRef="basicFormRef"
            :layouts="props.layouts"
            :modelData="props.dialogData"
            :rules="props.rules" />
        <div class="toolbar-wrapper">
            <BasicToolbar :toolData="toolData" />
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
