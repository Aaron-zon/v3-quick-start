<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Bell } from '@element-plus/icons-vue';
import { notifyData, messageData, todoData } from './data.js';
import NotifyList from './NotifyList.vue';
// 计算消息数
const badgeValue = computed(() => {
    let value = 0;
    for (let i = 0; i < data.value.length; i++) {
        value += data.value[i].list.length;
    }
    return value;
});

// 最大显示数
const badgeMax = 99;
// 弹出框宽度
const popoverWidth = 350;
// 当前tab名称
const activeName = ref('通知');
// tab模板
const data = ref([
    {
        name: '通知',
        type: 'primary',
        list: notifyData,
    },
    // 消息数据
    {
        name: '消息',
        type: 'danger',
        list: messageData,
    },
    // 待办数据
    {
        name: '待办',
        type: 'warning',
        list: todoData,
    },
]);
// 点击历史记录
const handleHistory = () => {
    ElMessage.success(`跳转到${activeName.value}历史页面`);
};
</script>

<template>
    <div class="notify-container">
        <el-popover placement="bottom" :width="popoverWidth" trigger="click">
            <template #reference>
                <el-badge
                    :value="badgeValue"
                    :max="badgeMax"
                    :hidden="badgeValue === 0">
                    <el-tooltip
                        effect="dark"
                        content="消息通知"
                        placement="bottom">
                        <el-icon :size="20">
                            <Bell />
                        </el-icon>
                    </el-tooltip>
                </el-badge>
            </template>

            <template #default>
                <el-tabs v-model="activeName" class="tabs-container" stretch>
                    <el-tab-pane
                        v-for="(item, index) in data"
                        :name="item.name"
                        :key="index">
                        <template #label>
                            {{ item.name }}
                            <el-badge
                                :value="item.list.length"
                                :max="badgeMax"
                                :type="item.type" />
                        </template>
                        <el-scrollbar height="400px">
                            <NotifyList :list="item.list" />
                        </el-scrollbar>
                    </el-tab-pane>
                </el-tabs>
                <div class="notify-history">
                    <el-button link @click="handleHistory"
                        >查看{{ activeName }}历史</el-button
                    >
                </div>
            </template>
        </el-popover>
    </div>
</template>

<style lang="scss" scoped>
.notify-container {
    margin-right: 10px;
    color: var(--el-text-color-regular);
    margin-top: 5px;
}
.notify-history {
    text-align: center;
    padding-top: 12px;
    border-top: 1px solid var(--el-border-color);
}

:deep(.el-badge__content) {
    box-sizing: border-box;
    height: 16px;
    min-width: 16px;
    padding: 3px;
}
</style>
