<script setup>
import { ref, onMounted, watch } from 'vue';
const props = defineProps([
    'tableSetting',
    'tableData',
    'tableCol',
    'toolData',
]);
const emits = defineEmits(['changePage', 'edit', 'delete', 'cellClickHandle']);
// 分页
const pagination = ref({
    layout: 'prev, pager, next, jumper',
    total: 100, // 默认条数
    pageSize: 10, // 页数
    currentPage: 1, // 当前页数
    /** 选择分页 */
    handleCurrentChange: async (page) => {
        pagination.value.currentPage = page;
        emits('changePage', page);
    },
});

watch(
    () => props.tableData.total,
    (newVal) => {
        pagination.value.total = newVal;
    },
);
/** 表格事件 */
const getTableEvents = () => {
    return {
        ...props.tableSetting.events,
    };
};

/** 表格bind */
const getTableBinds = () => {
    return {
        ...props.tableSetting.props,
    };
};

/** 表格列bind */
const getColBind = (col) => {
    return {
        ...col,
    };
};

/** 链接点击事件 */
const cellClickHandle = (scope) => {
    emits('cellClickHandle', { ...scope });
};

/** 修改按钮按下 */
const handleEdit = (row, data) => {
    emits('edit', { row, data });
};

/** 删除按钮按下 */
const handleDelete = (row, data) => {
    emits('delete', { row, data });
};

onMounted(() => {
    if (props.paginationData) {
        pagination.value.total = tableData.total;
    }
});
</script>

<template>
    <div class="basic-table-container" v-loading="tableSetting.loading">
        <el-table
            class="table-wrapper"
            :data="tableData.data"
            :border="true"
            style="width: 100%"
            v-bind="getTableBinds()"
            v-on="getTableEvents()"
        >
            <template v-for="(col, colIdx) in props.tableCol" :key="colIdx">
                <el-table-column v-bind="getColBind(col)">
                    <!-- 列信息col中有link属性时 显示链接 -->
                    <template #default="scope" v-if="col.link">
                        <el-link
                            class="col-link"
                            @click="cellClickHandle(scope)">
                            {{ scope.row[col.prop] }}
                        </el-link>
                    </template>
                    <!-- 列信息col中有btn属性时 显示按钮 -->
                    <template #default="scope" v-else-if="col.btn">
                        <el-button
                            type="primary"
                            @click="cellClickHandle(scope)">
                            {{ scope.row[col.prop] }}
                        </el-button>
                    </template>
                    <!-- 鼠标移入显示表格中信息（这是为了应对表格中文字过长显示不下时的状况） -->
                    <template #default="scope" v-else-if="col.type != 'index'">
                        <el-tooltip class="item" effect="dark" :content="scope.row[col.prop]" placement="top-start" v-if="col.title">
                            <span>{{ scope.row[col.prop] }}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </template>

            <!-- 默认操作列 可以通过tollData.show来控制是否显示 -->
            <el-table-column
                label="操作"
                :fixed="props?.toolData?.fixed || 'right'"
                :align="'center'"
                v-if="props?.toolData?.show">
                <template #default="scope">
                    <el-button
                        v-if="props.toolData.editFlg"
                        type="primary" text bg size="small"
                        @click="handleEdit(scope.row, scope)"
                    >
                        修改
                    </el-button>
                    <el-button
                        v-if="props.toolData.deleteFlg"
                        type="danger" text bg size="small"
                        @click="handleDelete(scope.row, scope)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
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
        width: 100%;

        .can-choose {
            cursor: pointer;
        }

        .col-link {
            cursor: pointer;
            color: var(--el-link-hover-text-color);
            text-decoration: underline;
        }
    }
    .pager-wrapper {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
