<script setup>
import BaseSearch from '@/components/BasicSearch/index.vue'
import BasicDialog from '@/components/BasicDialog/index.vue'
import BasicToolbar from '@/components/BasicToolbar/index.vue'
import BasicTable from '@/components/BasicTable/index.vue'

import { useSimpleTable, useTool, useDialog } from './hooks/index.js'

const { tableSetting, tableCol, tableData, toolbarData } = useSimpleTable();
const { searchLayouts, searchData } = useTool();
const { dialogProps, dialogLayouts, dialogData } = useDialog();

/** 检索 */
const searchHandle = () => {
    console.log('search')
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
                />
            </div>
        </el-card>

        <!-- 弹窗 -->
        <BasicDialog :dialogProps="dialogProps" 
            :dialogData="dialogData" 
            :layouts="dialogLayouts" 
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