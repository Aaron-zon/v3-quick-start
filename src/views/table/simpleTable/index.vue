<script setup>
import { ref } from 'vue';
import BasicSearch from '@/components/BasicSearch/index.vue';
import BasicDialog from '@/components/BasicDialog/index.vue';
import BasicToolbar from '@/components/BasicToolbar/index.vue';
import BasicTable from '@/components/BasicTable/index.vue';

import { useSimpleTable, useTool, useDialog } from './hooks/index.js';

const { tableSetting, tableCol, tableData, toolbarData, rightToolData, getTableData } =
    useSimpleTable();
const { searchLayouts, searchData } = useTool();
const { dialogProps, dialogLayouts, dialogData, dialogRules } = useDialog();

/** 检索 */
const searchHandle = () => {
    getTableData();
};

// 弹出框实例
const dialog = ref(null);
/** 弹出框取消 */
const dialogCancel = () => {};

/** 弹出框确定 */
const dialogConfirm = () => {};

const changePage = (page) => {
    getTableData(page);
};
</script>

<template>
    <div class="simple-table-container app-container">
        <!-- 检索区域 -->
        <BasicSearch :layouts="searchLayouts" :modelData="searchData" @search="searchHandle" />

        <!-- table区域 -->
        <el-card>
            <div class="toolbar-wrapper">
                <BasicToolbar :toolData="toolbarData" :rightToolData="rightToolData" />
            </div>

            <div class="table-wrapper">
                <BasicTable
                    :tableSetting="tableSetting"
                    :tableCol="tableCol"
                    :tableData="tableData"
                    @changePage="changePage" />
            </div>
        </el-card>

        <!-- 弹窗 -->
        <BasicDialog
            ref="dialog"
            :dialogProps="dialogProps"
            :dialogData="dialogData"
            :layouts="dialogLayouts"
            :rules="dialogRules"
            @cancel="dialogCancel"
            @confirm="dialogConfirm" />
    </div>
</template>

<style lang="scss" scoped>
.simple-table-container {
    .table-wrapper {
        margin-top: 20px;
    }
}
</style>
