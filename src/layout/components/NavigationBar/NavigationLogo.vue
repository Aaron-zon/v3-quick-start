<script setup>
</script>

<template>
    <div class="navigation-logo-container">
        <transition name="sidebar-logo-fade">
            <router-link key="collapse" to="/">
                <img src="@/assets/layout/logo.png" class="sidebar-logo" />
            </router-link>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.navigation-logo-container {
    height: 100%;
    display: flex;
    justify-content: center;
    img {
        height: 100%;
        margin-left: 10px;
    }
}
</style>