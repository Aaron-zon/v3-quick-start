<script setup>
import { ref, onMounted, defineExpose } from 'vue';
import { merge } from 'lodash-es';
import BasicForm from '@/components/BasicForm/index.vue';
import BasicToolbar from '@/components/BasicToolbar/index.vue';

const props = defineProps(['dialogProps', 'layouts', 'dialogData', 'dialogTool', 'rules']);
const emit = defineEmits(['confirm', 'cancel']);
//
const basicDialog = ref(null);
//
const basicFormRef = ref({});
// 表单实例
const basicForm = ref(null);
const toolData = ref([
    {
        name: '取消',
        events: {
            click: () => {
                // 调用父组件事件
                emit('cancel');
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
                basicForm.value.ref.validate((valid, fields) => {
                    if (valid) {
                        // 调用父组件事件
                        emit('confirm');
                    }
                });
            },
        },
    },
]);

// 默认bind
const defaultBinds = {
    // 默认设置点击遮罩不关闭弹窗
    'close-on-click-modal': false,
    // 默认宽度
    width: '50%',
    // 默认标题
    title: '弹出框',
};

/** 获取dialog属性 */
const getDialogBind = () => {
    let binds = props.dialogProps?.props || {};
    return merge(defaultBinds, binds);
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
});
</script>

<template>
    <el-dialog
        class="basic-dialog-container"
        v-model="props.dialogProps.show"
        v-bind="getDialogBind()"
        v-on="getDialogEvents()">
        <BasicForm
            ref="basicForm"
            :basicFormRef="basicFormRef"
            :layouts="props.layouts"
            :modelData="props.dialogData"
            :rules="props.rules" />
        <div class="toolbar-wrapper">
            <BasicToolbar :rightToolData="toolData" />
        </div>
    </el-dialog>
</template>

<style lang="scss" scoped>
.basic-dialog-container {
    .toolbar-wrapper {
        padding: 30px 0;

        .basic-toolbar-container {
            justify-content: flex-end;
        }
    }
}
</style>
