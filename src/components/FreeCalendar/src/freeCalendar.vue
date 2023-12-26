<script setup>
import { ref, computed } from 'vue'
import DateTable from './components/dateTable.vue'
import { rangeValidator } from './hooks/use-validator.js'
import { useCalendar } from './hooks/use-calendar.js'
import { useComponent } from './hooks/use-component.js'

defineOptions({
    name: 'FreeCalendar'
})

const props = defineProps({
    // v-model传入日期
    modelValue: {
        type: [Date, String]
    },
    // 日期范围
    range: {
        type: Array,
        validator: rangeValidator
    },
    // header部分按钮的排列
    headerToolbar: {
        type: Object,
        default: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }
    },
    // 用于修改header部分按钮的文字
    buttonText: {
        type: Object,
        default: {}
    },
    events: {
        type: Array,
        default: []
    }
})
const emit = defineEmits(['update:modelValue', 'input']);
const { date, realSelectedDay, selectDate, pickDay } = useCalendar(props, emit);
const { componentMap } = useComponent();

/** 左侧的按钮集合 */
const leftGroup = computed(() => {
    return props.headerToolbar.left
                .split(' ')
                .map(item => item.split(','));
})
const centerGroup = computed(() => {
    return props.headerToolbar.center
                .split(' ')
                .map(item => item.split(','));
})
const rightGroup = computed(() => {
    return props.headerToolbar.right
                .split(' ')
                .map(item => item.split(','));
})

const modeActive = ref('month');
const selectMode = (mode) => {
    modeActive.value = mode;
}

const headerProps = computed(() => {
    return {
        date: date,
        buttonText: props.buttonText,
        modeActive: modeActive.value,
    }
})

const headerEmit = computed(() => {
    return {
        selectDate: selectDate,
        selectMode: selectMode
    }
})
</script>

<template>
    <div class="free-calendar-container">
        <!-- 日历头部 -->
        <div class="fs-header">
            <div class="fs-header__button-group fs-header__left">
                <template v-for="(item, index) in leftGroup" :key="index">
                    <div class="fs-sub-group">
                        <component v-for="(sub, i) in item" :key="i" 
                            :is="componentMap[sub]" 
                            v-bind="headerProps"
                            v-on="headerEmit"
                        />
                    </div>
                </template>
            </div>
            <div class="fs-header__button-group fs-header__center">
                <template v-for="(item, index) in centerGroup" :key="index">
                    <div class="fs-sub-group">
                        <component v-for="(sub, i) in item" :key="i" 
                            :is="componentMap[sub]" 
                            v-bind="headerProps"
                            v-on="headerEmit" 
                        />
                    </div>
                </template>
            </div>
            <div class="fs-header__button-group fs-header__right">
                <template v-for="(item, index) in rightGroup" :key="index">
                    <div class="fs-sub-group">
                        <component v-for="(sub, i) in item" :key="i" 
                            :is="componentMap[sub]" 
                            v-bind="headerProps"
                            v-on="headerEmit" 
                        />
                    </div>
                </template>
            </div>
        </div>
        <!-- 日历主体 -->
        <div class="free-calendar__body">
            <component :is="DateTable" 
                :date="date" 
                :selected-day="realSelectedDay" 
                @pick="pickDay"
                :events="events"
            ></component>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.free-calendar-container {
    --fc-bg-color: #fff;
    --fc-button-bg-color: #2c3e50;
    --fc-button-border-color: #2c3e50;
    --fc-button-text-color: #fff;
    --fc-button-hover-bg-color: #1e2b37;
    --fc-button-hover-border-color: #1a252f;
    --fc-button-active-bg-color: #1a252f;
    --fc-button-active-border-color: #151e27;
    --fc-a-hover-border-color: #151e27;
    --fc-today-text-color: #409eff;
    --fc-selected-text-color: #409eff;
    --fc-calendar-selected-bg-color: #ecf5ff;

    --fc-daygrid-event-dot-width: 8px;
    --fc-event-border-color: #3788d8;
    --fc-event-bg-color: #3788d8;
    --fc-event-text-color: #fff;


    background-color: var(--fc-bg-color);
    padding: 12px;

    .fs-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 12px;

        &__button-group {
            display: flex;

            .fs-sub-group {
                display: flex;
                margin: 0 5px;
                .fc-button {
                    flex: 1 1 auto;
                    font-size: 1em;

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

                    :deep(.fc-icon) {
                        display: inline-block;
                        font-style: normal;
                        font-variant: normal;
                        font-weight: 400;
                        line-height: 1;
                        width: 1em;
                        height: 1em;
                        text-align: center;
                        text-transform: none;
                        user-select: none;
                        font-size: 1.5em;
                        vertical-align: middle;
                        box-sizing: border-box
                    }
                }
            }
        }

        &__title {
            cursor: pointer;

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