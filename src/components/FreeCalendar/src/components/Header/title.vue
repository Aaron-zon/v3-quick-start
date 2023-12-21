<script setup>
import { computed } from 'vue';
import { useLocale } from '../../hooks/use-locale.js';
const { t } = useLocale();

const props = defineProps(['date']);

const i18nMonthDate = computed(() => {
    const month = t(`fc.datepicker.month.${props.date.value.format('M')}`);
    const year = `${props.date.value.year()}${t('fc.datepicker.year')}`;
    return `${month} ${year}`;
})

const clickcc = () => {
    console.log(props.date.value.format('YYYY-MM-DD'))
}
</script>

<template>
    <div class="fs-header__title">
        <h2 class="title" @click="clickcc">
            {{ i18nMonthDate }}
        </h2>
    </div>
</template>

<style lang="scss" scoped>

</style>