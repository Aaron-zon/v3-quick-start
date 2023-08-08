<template>
    <main class="app-main-container">
        <router-view v-slot="{ Component }">
            <!-- <transition name="no-transform" mode="out-in"> -->
                <!-- <keep-alive> -->
                    <component :is="Component" :key="key"/>
                <!-- </keep-alive> -->
            <!-- </transition> -->
        </router-view>
    </main>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const key = computed(() => {
    return route.path
})

</script>

<style lang="scss" scoped>
.app-main-container {
    min-height: calc(100vh - var(--v3-navigationbar-height));
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: var(--v3-body-bg-color);
}

.fixed-header + .app-main-container {
    padding-top: var(--v3-navigationbar-height);
}
</style>