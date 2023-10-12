<script setup>
import { Fold, Expand } from '@element-plus/icons-vue';

const emit = defineEmits(['toggle-click']);
const props = defineProps({
    isActive: {
        type: Boolean,
        default: false,
    },
});

// click handle
const toggleSidebar = () => {
    emit('toggle-click');
};
</script>

<template>
    <div class="hamburger-container" @click="toggleSidebar">
        <el-icon :size="20" class="icon">
            <Fold v-if="props.isActive" />
            <Expand v-else />
        </el-icon>
    </div>
</template>

<style lang="scss" scoped>
.icon {
    vertical-align: middle;
}
</style>
