<script setup>
import { QUERY_COMPONENT_TYPE, QUERY_COMPONENT_KEY } from './constants/index.js'
const props = defineProps(['layouts', 'modelData'])

/** 获取当前组件 */
const getQueryComponentName = (item, i) => {
    const componentType = QUERY_COMPONENT_TYPE[item.type]
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
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.basic-from-container {
    .form-wrapper {
        display: flex;
        .query-wrapper {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
          
            .el-form-item {
                margin: 5px 20px;
                width: 330px;

                
                &>:deep(.el-form-item__label) {
                    width: 120px;
                }
                :deep(.el-autocomplete) {
                    width: 100%;
                }
            }
        }

    }
}
</style>