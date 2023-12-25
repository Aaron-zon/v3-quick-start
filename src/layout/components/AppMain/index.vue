<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const key = computed(() => {
    return route.path;
});
</script>

<template>
    <main class="app-main-container">
        <router-view v-slot="{ Component }">
            <transition name="no-transform" mode="out-in">
                <component :is="Component" :key="key" />
            </transition>
        </router-view>
    </main>
</template>

<style lang="scss" scoped>
.app-main-container {
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: var(--v3-body-bg-color);
}

.fixed-header + .app-main-container {
    padding-top: var(--v3-navigationbar-height);
}
</style>
