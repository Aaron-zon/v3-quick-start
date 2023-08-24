<script setup>
import BasicForm from '@/components/BasicForm/index.vue'
import BasicToolbar from '@/components/BasicToolbar/index.vue'

const props = defineProps(['layouts', 'toolData', 'modelData', 'resetHandle', 'searchHandle']);

/** 重置 */
const resetHandle = () => {
    props.resetHandle();
}

/** 检索 */
const searchHandle = () => {
    props.searchHandle();
}
</script>
<template>
    <div class="basic-search-container">
        <el-card shadow="never" class="search-wrapper">
            <BasicForm 
                :layouts="props.layouts" 
                :modelData="props.modelData"
            />
            <div class="tool-wrapper">
                <template v-if="props.toolData && props.toolData.length">
                    <BasicToolbar 
                        :toolData="props.toolData"
                    />
                </template>
                <template v-else>
                    <el-button class="tool-btn" @click="resetHandle">重置</el-button>
                    <el-button class="tool-btn" type="primary" @click="searchHandle">检索</el-button>
                </template>
            </div>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.basic-search-container {
    .search-wrapper {
        margin-bottom: 20px;

        &:deep(.el-card__body) {
            display: flex;

            .basic-from-container {
                flex: 9;
            }
            .tool-wrapper {
                width: 10%;
                flex: 1;

                display: flex;
                justify-content: center;

            }
        }

        
    }

    
    
}
</style>