<script setup>
import { QUERY_COMPONENT_TYPE, QUERY_COMPONENT_KEY } from './constants/index.js'
const props = defineProps(['layouts', 'toolData', 'modelData'])

const getQueryComponentName = (item, i) => {
    const componentType = QUERY_COMPONENT_TYPE[item.type]
    console.log(componentType)
    if (componentType == null) {
        console.warn(`queryData中第${i}个数据没有设定正确的type, 当前显示默认组件`)
        return QUERY_COMPONENT_TYPE['default']
    }
    return componentType
}

/** 判断组件是否是共生组件 */
const checkParagenesis = (item) => {
    return [QUERY_COMPONENT_KEY.select].includes(item.type)  
}

/** 获取组件属性 */
const getComponentBind = (item) => {
    return {
        ...item.props
    }
};

/** 获取组件事件 */
const getComponentEvents = (item) => {
    let events = {};
    const modelData = props.modelData
    Object.entries(item.events || {}).forEach((data) => {
        const [key, fn] = data;
        events[key] = (...params) => fn({modelData}, ...params);
    })
    return events
}

</script>

<template>
    <div class="basic-from-container">
        <el-form class="form-wrapper">
            <div class="query-wrapper">
                <template v-for="(item, i) in props.layouts" :key="i">
                    <el-form-item :label="item.name" >
                        <!-- select外组件 -->
                        <component
                            :is="getQueryComponentName(item, i)" 
                            v-model="props.modelData[item.model]"
                            v-bind="getComponentBind(item)"
                            v-on="getComponentEvents(item)"
                        >
                            <template v-if="checkParagenesis(item)" #default>
                                <el-option 
                                    v-for="(option, oIdx) in item.props.options" 
                                    :key="oIdx" 
                                    :label="option.label" 
                                    :value="option.value" 
                                />
                            </template>
                        </component>
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