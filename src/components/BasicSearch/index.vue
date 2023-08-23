<script setup>
import BasicForm from '@/components/BasicForm/index.vue'
const props = defineProps(['layouts', 'toolData', 'modelData'])
</script>
<template>
    <div class="basic-search-container">
        <el-card shadow="never" class="search-wrapper">
            <BasicForm 
                :layouts="props.layouts" 
                :modelData="props.modelData"
            />
            <div class="tool-wrapper">
                <template v-if="props.toolData && props.toolData.length" >
                    <el-button 
                        v-for="(item, i) in props.toolData" 
                        :key="i"
                    >
                        {{ item.name || '检索' }}
                    </el-button>
                </template>
                
                <template v-else>
                    <el-button class="tool-btn" >重置</el-button>
                    <el-button class="tool-btn" type="primary">检索</el-button>
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