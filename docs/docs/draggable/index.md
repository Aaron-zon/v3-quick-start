# 拖拽

拖拽采用的`vue-draggable-plus`插件，实例中提供了一个简单的例子，它基于Sortablejs，支持vue3。

提供了`组件方式`、`函数方式`和`指令方式`的使用方法。

如果需要更加详细的说明可以参照官方文档：https://alfred-skyblue.gitee.io/vue-draggable-plus/guide/

## 示例
示例中展示了一个`双列表拖拽`的例子：

```javascript
<script setup>
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
const list1 = ref([
    { name: '苹果', id: 1, disabled: true },
    { name: '日历', id: 2 },
    { name: '书本', id: 3 },
    { name: '铅笔', id: 4 }
])

const list2 = ref([
    { name: '纸巾', id: 5 },
    { name: '矿泉水', id: 6 },
    { name: '电脑', id: 7 },
    { name: '手机', id: 8 }
])

function onUpdate() {
  console.log('update')
}
function onAdd() {
  console.log('add')
}
function remove() {
  console.log('remove')
}
// 过滤不需要拖拽的元素
const filter = '.draggable-item1'
</script>

<template>
    <div class="draggable-container">

        <VueDraggable 
            ref="el" 
            v-model="list1" 
            class="draggable"
            animation="150"
            ghostClass="ghost"
            group="people"
            :filter="filter"
        >
            <div v-for="item, i in list1" :key="item.id" class="draggable-item" :class="`draggable-item${item.id}`">
                {{ item.name }}
            </div>
        </VueDraggable>

        <VueDraggable 
            ref="el" 
            v-model="list2" 
            class="draggable"
            animation="150"
            ghostClass="ghost"
            group="people"
        >
            <div v-for="item in list2" :key="item.id" class="draggable-item" :class="`draggable-item${item.id}`">
                {{ item.name }}
            </div>
        </VueDraggable>
    </div>
    
</template>

<style lang="scss" scoped>
.draggable-container {
    display: flex;
    justify-content: center;
    background-color: #fff;
    text-align: center;

    .draggable {
        background-color: #F7F8F9;
        padding: 10px;
        width: 300px;
        min-height: 230px;
        border: 2px solid #ccc;
        vertical-align: top;
        margin: 10px;

        .draggable-item {
            background-color: #EFF1F3;
            padding: 10px;
            margin: 10px;
            user-select: none;
        }
    }
}
</style>
```