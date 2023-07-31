<template>
    <a v-if="isExternal(props.to)" :href="props.to" target="_blank" rel="noopener">
        <slot />
    </a>
    <router-link v-else :to="props.to">
        <slot />
    </router-link>
</template>

<script setup>
import { isExternal } from "@/utils/validate"
const props = defineProps({
    to: {
        required: true
    }
})
console.log(props.to)
</script>

<style lang="scss" scoped>
</style>