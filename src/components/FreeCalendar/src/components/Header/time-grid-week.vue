<script setup>
import { computed } from 'vue';
import { useLocale } from '../../hooks/use-locale.js';
const { t } = useLocale();

const props = defineProps(['modeActive', 'buttonText'])
const emit = defineEmits(['selectMode'])
const mode = 'week'
const selectMode = () => {
    emit('selectMode', mode)
}

const title = computed(() => {
    return props.buttonText.month || t('fc.datepicker.activeWeek')
})
</script>

<template>
    <button class="fc-button fc-button__primary"
        :class="{'active': modeActive == mode}"
        @click="selectMode"
    >
        {{ title }}
    </button>
</template>

<style lang="scss" scoped>

</style>