<script setup>

const props = defineProps(['tableData', 'tableCol']);
</script>

<template>
    <div class="basic-table-container">
        <el-table :data="tableData" :border="true" style="width: 100%">
                <template v-for="(col, colIdx) in props.tableCol" :key="colIdx">
                    <el-table-column :prop="col.is" :label="col.label" />
                </template>
        </el-table>
    </div>
</template>

<style lang="scss" scoped>
.basic-table-container {

}
</style>