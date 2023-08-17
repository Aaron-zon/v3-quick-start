<script setup>
import { QUERY_COMPONENT_TYPE } from './constants'
const props = defineProps(['data'])
const queryData = props.data?.queryData || []
const toolData = props.data?.toolData || []
const modelData = props.data?.modelData || []

const getQueryComponentName = (componentInfo, i) => {
    const componentType = QUERY_COMPONENT_TYPE[componentInfo.type]
    if (componentType == null) {
        console.warn(`queryData中第${i}个数据没有设定正确的type, 当前显示默认组件`)
        return QUERY_COMPONENT_TYPE['default']
    }
    return componentType
}

</script>

<template>
    <div class="basic-from-container">
        <el-form class="form-wrapper" v-if="props.data">
            <div class="query-wrapper">
                <template v-for="(item, i) in queryData" :key="i">
                    <el-form-item :label="item.name">
                        <component :is="getQueryComponentName(item, i)" 
                            :lable="item.name" 
                            placeholder="text"
                            v-model="modelData[item.model]"
                        />
                    </el-form-item>
                </template>
            </div>
            <div class="tool-wrapper">
                <template v-if="toolData && toolData.length" >
                    <el-button 
                        v-for="(item, i) in toolData" 
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
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.basic-from-container {
    .form-wrapper {
        display: flex;
        .query-wrapper {
            width: 80%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            .el-form-item {
                margin: 5px 20px;
            }
        }

        .tool-wrapper {
            width: 20%;
        }
        
    }
}
</style>