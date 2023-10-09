<script setup>
import { ref, onMounted } from 'vue'
import BasicForm from '@/components/BasicForm/index.vue'
import BasicToolbar from '@/components/BasicToolbar/index.vue'

const props = defineProps(['layouts', 'toolData', 'modelData']);
const emit = defineEmits(['reset', 'search']);

const baseModel = ref({});
/** 重置 */
const resetHandle = () => {
    let keys = Object.keys(props.modelData);
    for (let key of keys) {
        props.modelData[key] = baseModel.value[key];
    }
    emit('reset');
}

/** 检索 */
const searchHandle = () => {
    emit('search');
}

onMounted(() => {
    if (props?.modelData) {
        baseModel.value = JSON.parse(JSON.stringify(props.modelData));
    }
})
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
                padding-top: 10px;
                padding-right: 5px;
                width: 10%;
                flex: 1;

                display: flex;
                justify-content: center;

            }
        }

        
    }

    
    
}
</style>