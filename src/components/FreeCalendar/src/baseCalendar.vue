<script setup>
import { ref, computed } from 'vue';
import BasicDateTable from './components/BasicDateTable.vue';
import { useCalendar } from './hooks/use-calendar.js';
import { rangeValidator } from './hooks/use-validator.js';
import { useLocale } from './hooks/use-locale.js';

defineOptions({
    name: 'BaseCalendar'
})

const props = defineProps({
    modelValue: {
        type: [Date, String]
    },
    range: {
        type: Array,
        validator: rangeValidator
    }
})

const emit = defineEmits(['update:modelValue', 'input']);

const { date, realSelectedDay, selectDate, pickDay } = useCalendar(props, emit);
const { t } = useLocale();

const modeActive = ref(0);
const jumpActive = ref(0);

const i18nDate = computed(() => {
    const month = t(`fc.datepicker.month.${date.value.format('M')}`);
    const year = `${date.value.year()}${t('fc.datepicker.year')}`;
    return `${month} ${year}`;
})

const selectMode = (value) => {
    modeActive.value = value;
}

</script>

<template>
    <div class="base-calendar-container">
        <!-- header -->
        <div class="fs-header">
            <div class="fs-header__button-group change-mode">
                <slot name="header">
                    <button class="fc-button fc-button__primary month" :class="{'active': modeActive == 0}" @click="selectMode(0)">
                        {{ t('fc.datepicker.activeMonth') }}
                    </button>
                    <button class="fc-button fc-button__primary week" :class="{'active': modeActive == 1}" @click="selectMode(1)">
                        {{ t('fc.datepicker.activeWeek') }}
                    </button>
                    <button class="fc-button fc-button__primary day" :class="{'active': modeActive == 2}" @click="selectMode(2)">
                        {{ t('fc.datepicker.activeDay') }}
                    </button>
                    <button class="fc-button fc-button__primary list" :class="{'active': modeActive == 3}" @click="selectMode(3)">
                        {{ t('fc.datepicker.activeList') }}
                    </button>
                </slot>
            </div>
            <div class="fs-header__title">
                <h2 class="title">{{ i18nDate }}</h2>
            </div>
            <div class="fs-header__button-group jump-data">
                <button class="fc-button fc-button__primary today" 
                    :class="{'active': jumpActive == 0}" @click="selectDate('prev-month')"
                >
                    {{ t('fc.datepicker.prevMonth') }}
                </button>
                <button class="fc-button fc-button__primary today" 
                    :class="{'active': jumpActive == 1}" @click="selectDate('next-month')"
                >
                    {{ t('fc.datepicker.nextMonth') }}
                </button>
                <button class="fc-button fc-button__primary today" 
                    :class="{'active': jumpActive == 2}" @click="selectDate('today')"
                >
                    {{ t('fc.datepicker.toDay') }}
                </button>
            </div>
        </div>
        <!-- body -->
        <div class="free-calendar__body">
            <BasicDateTable :date="date" :selected-day="realSelectedDay" @pick="pickDay"></BasicDateTable>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.base-calendar-container {
    --fc-bg-color: #fff;
    --fc-button-bg-color: #2c3e50;
    --fc-button-border-color: #2c3e50;
    --fc-button-text-color: #fff;
    --fc-button-hover-bg-color: #1e2b37;
    --fc-button-hover-border-color: #1a252f;
    --fc-button-active-bg-color: #1a252f;
    --fc-button-active-border-color: #151e27;


    background-color: var(--fc-bg-color);
    padding: 12px;

    .fs-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 12px;
        
        &__button-group {
            .fc-button {
                &:not(:first-child) {
                    border-bottom-left-radius: 0px;
                    border-top-left-radius: 0px;
                }

                &:not(:last-child) {
                    border-bottom-right-radius: 0px;
                    border-top-right-radius: 0px;
                }

                &.active {
                    // outline: none;
                    background-color: var(--fc-button-active-bg-color);
                    border-color: var(--fc-button-active-border-color);
                    color: var(--fc-button-text-color);
                }
            }
        }

        &__title {
            .title {
                font-size: 1.75em;
                margin: 0;
            }
        }
    }

    .fc-button {
        border: 1px solid transparent;
        display: inline-block;
        font-size: 1em;
        font-weight: 400;
        line-height: 1.5;
        padding: 0.4em 0.65em;
        text-align: center;
        user-select: none;
        vertical-align: middle;
        appearance: button;
        margin: 0;
        overflow: visible;
        text-transform: none;

        &__primary {
            background-color: var(--fc-button-bg-color);
            border-color: var(--fc-button-border-color);
            color: var(--fc-button-text-color);

            &:active {
                background-color: var(--fc-button-active-bg-color);
                border-color: var(--fc-button-active-border-color);
                color: var(--fc-button-text-color);
                box-shadow: rgba(76, 91, 106, 0.5) 0px 0px 0px 0.2rem;
            }

            &:hover {
                background-color: var(--fc-button-hover-bg-color);
                border-color: var(--fc-button-hover-border-color);
                color: var(--fc-button-text-color)
            }

            &:focus {
                outline: none;
            }
        }
    }
}
</style>