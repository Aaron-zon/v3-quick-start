<script setup>
import { computed } from 'vue';
import { useLocale } from '../../hooks/use-locale.js';
const { t } = useLocale();

const props = defineProps(['buttonText']);
const emit = defineEmits(['selectDate']);

const selectDate = () => {
    emit('selectDate', 'today');
}

const title = computed(() => {
    return props.buttonText.today || t('fc.datepicker.today')
})
</script>

<template>
    <button class="fc-button fc-button__primary"
        @click="selectDate"
    >
        {{ title }}
    </button>
</template>

<style lang="scss" scoped>

</style>