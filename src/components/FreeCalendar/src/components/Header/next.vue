<script setup>
const props = defineProps(['buttonText']);
const emit = defineEmits(['selectDate']);

const selectDate = () => {
    emit('selectDate', 'next-month');
}
</script>

<template>
    <button class="fc-button fc-button__primary"
        @click="selectDate"
    >
        <template v-if="buttonText.next">
            {{ buttonText.next }}
        </template>
        <span v-else class="fc-icon fc-icon-shape"></span>
    </button>
</template>

<style lang="scss" scoped>
.fc-button {
    .fc-icon-shape {
        &::before {
            content: ">";
            box-sizing: border-box;
        }
    }
}
</style>