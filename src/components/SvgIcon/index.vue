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
});

// svg 的地址
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
    <svg class="svg-icon svg-icon-container" aria-hidden="true">
        <use :href="symbolId" />
    </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>
