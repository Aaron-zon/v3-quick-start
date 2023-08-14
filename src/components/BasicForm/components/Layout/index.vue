<script setup>

const getComponent = (layout) => {
    return ""
}
</script>

<template>
    <div class="loyout-container">
        <component 
            v-for="(layout, i) in layouts"
            :key="i"
            :is="getComponent(layout)"
        >

        </component>
    </div>
</template>

<style lang="scss" scoped>

</style>