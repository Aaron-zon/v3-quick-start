<script setup>
import BaseSearch from '@/components/BasicSearch/index.vue'
import BasicDialog from '@/components/BasicDialog/index.vue'
import BasicToolbar from '@/components/BasicToolbar/index.vue'
import BasicTable from '@/components/BasicTable/index.vue'

import { useSimpleTable, useTool, useDialog } from './hooks/index.js'

const { tableSetting, tableCol, tableData, toolbarData, getTableData } = useSimpleTable();
const { searchLayouts, searchData } = useTool();
const { dialogProps, dialogLayouts, dialogData, dialogRules } = useDialog();

/** 检索 */
const searchHandle = () => {
    getTableData();
}

/** 弹出框取消 */
const dialogCancel = () => {

}

/** 弹出框确定 */
const dialogConfirm = () => {
    dialogProps.value.dialog.formRef.validate((valid, fields) => {
        console.log(fields)
    })
}

const changePage = (page) => {
    getTableData(page);
}

</script>

<template>
    <div class="simple-table-container app-container">
        <!-- 检索区域 -->
        <BaseSearch 
            :layouts="searchLayouts"
            :modelData="searchData"
            @search="searchHandle" 
        />

        <!-- table区域 -->
        <el-card >
            <div class="toolbar-wrapper">
                <BasicToolbar :toolData="toolbarData"/>
            </div>

            <div class="table-wrapper">
                <BasicTable 
                    :tableSetting="tableSetting"
                    :tableCol="tableCol" 
                    :tableData="tableData" 
                    @changePage="changePage"
                />
            </div>
        </el-card>

        <!-- 弹窗 -->
        <BasicDialog 
            :dialogProps="dialogProps" 
            :dialogData="dialogData" 
            :layouts="dialogLayouts"
            :rules="dialogRules"
            @cancel="dialogCancel"
            @confirm="dialogConfirm"
        />
    </div>
</template>

<style lang="scss" scoped>
.simple-table-container {
    .table-wrapper {
        margin-top: 20px;
    }
}
</style>