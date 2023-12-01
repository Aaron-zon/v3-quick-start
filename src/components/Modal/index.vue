<script setup>
import { ref } from 'vue';
const props = defineProps([]);
</script>

<template>
    <teleport to="body">
        <div class="modal-container">
            <slot></slot>
        </div>
    </teleport>
</template>

<style lang="scss" scoped>
.modal-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>