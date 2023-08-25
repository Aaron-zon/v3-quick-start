<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['tableSetting', 'tableData', 'tableCol', 'toolData']);

// 分页
const pagination = ref({
    layout: "prev, pager, next, jumper",
    total: 100,
    pageSize: 10,
    currentPage: 1,
    handleCurrentChange: async (page) => {
        let result =  await props.tableData.getTableData(page);

        if (result) {
            pagination.value.currentPage = page;
            pagination.value.total = props.tableData.total;
        }
    }
})

/** 表格事件 */
const getTableEvents = () => {
    return {
        ...props.tableSetting.events
    }
}

/** 表格bind */
const getTableBinds = () => {
    return {
        ...props.tableSetting.props
    }
}

/** 表格列bind */
const getColBind = (col) => {
    return {
        ...col
    }
}

/** 修改按钮按下 */
const handleEdit = (row, data) => {
    props.toolData.handleEdit(row, data);
}

/** 删除按钮按下 */
const handleDelete = (row, data) => {
    props.toolData.handleDelete(row, data);
}

onMounted(() => {
    if (props.paginationData) {
        pagination.value.total = tableData.total;
    }
})
</script>

<template>
    <div class="basic-table-container" v-loading="tableSetting.loading">
        <el-table class="table-wrapper" :data="tableData.data" :border="true" style="width: 100%" v-bind="getTableBinds()" v-on="getTableEvents()">
            <template v-for="(col, colIdx) in props.tableCol" :key="colIdx">
                <el-table-column v-bind="getColBind(col)" />
            </template>
            <!-- 操作 -->
            <el-table-column label="操作" fixed="right" align="center" v-if="props?.toolData?.show">
                <template #default="scope">
                    <el-button v-if="props.toolData.editFlg" type="primary" text bg size="small" @click="handleEdit(scope.row, scope)">修改</el-button>
                    <el-button v-if="props.toolData.deleteFlg" type="danger" text bg size="small" @click="handleDelete(scope.row, scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pager-wrapper">
            <el-pagination 
                background 
                :layout="pagination.layout" 
                :total="pagination.total" 
                :page-size="pagination.pageSize"
                :currentPage="pagination.currentPage"
                @current-change="pagination.handleCurrentChange"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.basic-table-container {

    .table-wrapper {
        margin-bottom: 20px;
    }
    .pager-wrapper {
        display: flex;
        justify-content: flex-end;
    }
}
</style>