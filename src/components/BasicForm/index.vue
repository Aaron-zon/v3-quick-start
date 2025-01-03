<script setup>
import { ref, onMounted } from 'vue';
import {
    QUERY_COMPONENT_TYPE,
    QUERY_COMPONENT_KEY,
} from './constants/index.js';

const props = defineProps(['layouts', 'modelData', 'rules', 'basicFormRef']);
const formRef = ref(null);
onMounted(() => {
    if (props.basicFormRef) {
        props.basicFormRef.formRef = formRef;
    }
});
/** 获取当前组件 */
const getQueryComponentName = (item, i) => {
    const componentType = QUERY_COMPONENT_TYPE[item.type];
    if (componentType == null) {
        console.warn(
            `queryData中第${i}个数据没有设定正确的type, 当前显示默认组件`,
        );
        return QUERY_COMPONENT_TYPE['default'];
    }
    return componentType;
};

/** 判断组件是否是共生组件 */
const checkParagenesis = (item) => {
    return [QUERY_COMPONENT_KEY.select].includes(item.type);
};

/** 获取组件属性 */
const getComponentBind = (item) => {
    if (
        item.type == QUERY_COMPONENT_KEY.autocomplete &&
        !item.props['fetch-suggestions']
    ) {
        item.props['fetch-suggestions'] = autocompleteQuerySearch.bind(
            item.props,
        );
    }

    return {
        ...item.props,
    };
};

/** 获取组件事件 */
const getComponentEvents = (item) => {
    let events = {};
    const modelData = props.modelData;
    Object.entries(item.events || {}).forEach((data) => {
        const [key, fn] = data;
        events[key] = (...params) => fn({ modelData }, ...params);
    });
    return events;
};

/** 返回自动补全组件的下拉列表数据 */
const autocompleteQuerySearch = function (queryString, cb) {
    let autocompleteMode = this.autocompleteMode;
    const results = queryString
        ? this.options.filter(autocompleteFilter(queryString, autocompleteMode))
        : this.options;
    cb(results);
};

/** 根据输入值对自动补全组件的数据进行筛选 */
const autocompleteFilter = (queryString, autocompleteMode) => {
    return (restaurant) => {
        let result =
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !=
            -1;
        if (autocompleteMode == 'left') {
            result =
                restaurant.value
                    .toLowerCase()
                    .indexOf(queryString.toLowerCase()) === 0;
        }
        return result;
    };
};

defineExpose({
    ref: formRef,
});
</script>

<template>
    <div class="basic-from-container">
        <el-form
            class="form-wrapper"
            ref="formRef"
            :rules="props.rules"
            :model="props.modelData">
            <div class="query-wrapper">
                <template v-for="(item, i) in props.layouts" :key="i">
                    <el-form-item :label="item.name" :prop="item.model">
                        <!-- select外组件 -->
                        <component
                            :is="getQueryComponentName(item, i)"
                            v-model="props.modelData[item.model]"
                            v-bind="getComponentBind(item)"
                            v-on="getComponentEvents(item)">
                            <template v-if="checkParagenesis(item)" #default>
                                <el-option
                                    v-for="(option, oIdx) in item.props.options"
                                    :key="oIdx"
                                    :label="option.label"
                                    :value="option.value" />
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
                margin: 20px 20px;
                width: 300px;
                margin: 10px 10px;

                & > :deep(.el-form-item__label) {
                    width: 90px;
                }
                :deep(.el-autocomplete) {
                    width: 100%;
                }
            }
        }
    }
}
</style>
