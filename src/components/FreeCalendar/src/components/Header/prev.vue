<script setup>
const props = defineProps(['buttonText']);
const emit = defineEmits(['selectDate']);

const selectDate = () => {
    emit('selectDate', 'prev-month');
}
</script>

<template>
    <button class="fc-button fc-button__primary" 
        @click="selectDate"
    >
        <template v-if="buttonText.prev">
            {{ buttonText.prev }}
        </template>
        <span v-else class="fc-icon fc-icon-shape"></span>
        
    </button>
</template>

<style lang="scss" scoped>
.fc-button {
    .fc-icon-shape {
        &::before {
            content: "<";
            box-sizing: border-box;
        }
    }
}
</style>