<script setup>
import { computed } from 'vue';

const props = defineProps({
    prefix: {
        type: String,
        default: 'icon',
    },
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: '',
    }
});

// svg 的地址
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>

    <svg v-if="props.icon === ''" class="svg-icon svg-icon-container" aria-hidden="true">
        <use :href="symbolId" />
    </svg>
    <font-awesome-icon v-else :icon="props.icon" />
</template>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>
