<script setup>
import { computed } from 'vue';
import { useLocale } from '../../hooks/use-locale.js';
const { t } = useLocale()

const props = defineProps(['modeActive', 'buttonText'])
const emit = defineEmits(['selectMode'])
const mode = 'month'
const selectMode = () => {
    emit('selectMode', mode)
}

const title = computed(() => {
    return props.buttonText.month || t('fc.datepicker.activeMonth')
})
</script>

<template>
    <button class="fc-button fc-button__primary month"
        :class="{'active': modeActive == mode}"
        @click="selectMode"
    >
        {{ title }}
    </button>
</template>

<style lang="scss" scoped>

</style>

