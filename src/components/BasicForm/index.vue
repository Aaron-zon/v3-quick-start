<script setup>
import { QUERY_COMPONENT_TYPE } from './constants'
const props = defineProps(['layouts', 'toolData', 'modelData'])

const getQueryComponentName = (componentInfo, i) => {
    const componentType = QUERY_COMPONENT_TYPE[componentInfo.is]
    if (componentType == null) {
        console.warn(`queryData中第${i}个数据没有设定正确的type, 当前显示默认组件`)
        return QUERY_COMPONENT_TYPE['default']
    }
    return componentType
}

const checkSelect = (item) => {
    return item.is != 'select'
}

const getComponentType = (item) => {
    return item.type;
}

</script>

<template>
    <div class="basic-from-container">
        <el-form class="form-wrapper">
            <div class="query-wrapper">
                <template v-for="(item, i) in props.layouts" :key="i">
                    <el-form-item :label="item.name" >
                        <!-- select外组件 -->
                        <component v-if="checkSelect(item)"
                            :is="getQueryComponentName(item, i)" 
                            v-model="props.modelData[item.model]"
                            :lable="item.name"
                            :placeholder="item.placeholder || ''"
                            :options="item.options"
                            :type="getComponentType(item)"
                            :fetch-suggestions="querySearch"
                        />

                        <!-- select组件 -->
                        <el-select v-else v-model="props.modelData[item.model]">
                            <el-option v-for="(option, oIdx) in item.options" :key="oIdx" :label="option.label" :value="option.value" />
                        </el-select>
                    </el-form-item>
                </template>
            </div>
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
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.basic-from-container {
    .form-wrapper {
        display: flex;
        .query-wrapper {
            width: 90%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
          
            .el-form-item {
                margin: 5px 0px;
                width: 400px;

                .el-input {
                    width: 200px;
                }

                &>:deep(.el-form-item__label) {
                    min-width: 150px;
                }
            }
        }

        .tool-wrapper {
            display: flex;
            width: 10%;
        }
        
    }
}
</style>