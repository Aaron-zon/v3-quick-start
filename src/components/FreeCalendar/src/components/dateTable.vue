<script setup>
import { computed } from 'vue';
import { useDateTable } from '../hooks/use-date-table.js';
import dayjs from 'dayjs'

defineOptions({
    name: 'DateTable',
})

const props = defineProps({
    selectedDay: {
        type: Object
    },
    range: {
        type: Array
    },
    date: {
        type: Object,
        required: true,
    },
    hideHeader: {
        type: Boolean
    },
    events: {
        type: Array,
        default: []
    }
});
const emit = defineEmits(['pick'])
const { weekDays, rows, eventMap } = useDateTable(props, emit);

/**
 * 获取日期位置动态样式
 * @param { Object } cell 
 */
const cellClass = (cell) => {
    const {type, text} = cell;
    return {
        'fc-current-date': type == 'current',
        'is-today': (props.date.format('YYYYMM') + text) == dayjs().format('YYYYMMDD'),
        'is-selected': props.date.date() == text && type == 'current',
    }
}
/**
 * 获取每一个td的动态样式
 * @param { Object } cell 
 */
const colClass = (cell) => {
    const {type, text} = cell;
    const day = props.date.date();
    return {
        'is-selected': day == text && type == 'current',
    }
}
/**
 * 选择日期
 * @param { Object } cell 
 */
const pickDay = (cell) => {
    let selectedDate = props.date;
    if (cell.type == 'prev') {
        selectedDate = selectedDate.add(-1, 'month').set('date', cell.text);
    } else if (cell.type == 'next') {
        selectedDate = selectedDate.add(1, 'month').set('date', cell.text);
    } else {
        selectedDate = props.date.set('date', cell.text);
    }

    emit('pick', selectedDate);
}

/**
 * 管理任务显示
 * @param { Object } event 
 * @param { Object } cell 
 */
const eventManage = (cell) => {
    const {type, text} = cell;
    let date = props.date;
    if (type == 'prev') {
        date = date.add(-1, 'month').set('date', text)
    } else if (type == 'next') {
        date = date.add(-1, 'month').set('date', text)
    } else {
        date = date.set('date', text);
    }

    return !!eventMap.value[date.format('YYYY-MM-DD')];
}

/**
 * 获取event的样式
 * @param { Object } event 
 */
const eventClass = (event) => {
    if (!event.start) {
        return [];
    }
    const resClass = [];
    const start = dayjs(event.start);
    const end = event.end ? dayjs(event.end) : null;
    const startTime = start.format('HH:mm:ss');
    const endTime = end ? end.format('HH:mm:ss') : '00:00:00';
    if (startTime === '00:00:00' && endTime === '00:00:00') {
        resClass.push('fc-all-day-event');
    }

    return resClass;
}
</script>

<template>
    <table class="date-table-container">
        <thead>
            <tr class="fc-row">
                <th class="fc-col" v-for="day in weekDays" :key="day">{{ day }}</th>
            </tr>
        </thead>

        <tbody>
            <tr class="fc-row" v-for="(row, index) in rows" :key="index">
                <td v-for="(cell, key) in row" :key="key" 
                    class="fc-col" :class="colClass(cell)"
                    @click="pickDay(cell)"
                >
                    <div class="fc-daygrid-day-frame">
                        <slot name="date-cell">
                            <div class="fc-daygrid-day-top" :class="cellClass(cell)">
                                <a href="#" class="fc-daygrid-day-number">{{ cell.text }}</a>
                            </div>
                        </slot>

                        <div class="fc-daygrid-day-events">
                            <template v-if="eventManage(cell)">
                                <div class="fc-daygrid-event-harness" v-for="(event, index) in eventMap[cell.date]" :key="index">
                                    <a href="#" :class="['fc-event', ...eventClass(event)]">
                                        <div class="fc-daygrid-event-dot"></div>
                                        <div class="fc-event-time">{{ event.time }}</div>
                                        <div class="fc-event-title">{{ event.title }}</div>
                                    </a>
                                </div>
                            </template>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
.date-table-container {
    --fc-border-color: #ddd;

    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;

    .fc-row {
        display: flex;
        width: 100%;

        .fc-col {
            flex: 1;
            border: 1px solid var(--fc-border-color);
            margin-left: -1px;
            margin-top: -1px;

            .fc-daygrid-day-frame {
                height: 130px;
                
                .fc-daygrid-day-top {
                    user-select: none;
                    box-sizing: border-box;
                    padding: 0 5px;
                    margin: 3px 0;
                    text-align: right;
                    height: 24px;
                    opacity: .3;

                    .fc-daygrid-day-number {
                        user-select: none;
                        &:hover {
                            border-bottom: 1px solid var(--fc-a-hover-border-color);
                        }
                    }
                }

                .is-selected {
                    color: var(--fc-selected-text-color);
                }

                .is-today {
                    color: var(--fc-today-text-color);
                    font-weight: 600;
                }
                
                .fc-current-date {
                    opacity: 1;
                }

                .fc-daygrid-day-events {
                    .fc-daygrid-event-harness {
                        .fc-event {
                            display: flex;
                            align-items: center;
                            text-align: left;
                            position: relative;
                            font-size: 12px;
                            margin-left: 2px;
                            margin-right: 2px;
                            height: 16px;
                            line-height: 16px;
                            user-select: none;
                            -webkit-user-drag: none;
                            -moz-user-drag: none;
                            user-drag: none;

                            .fc-daygrid-event-dot {
                                border: calc(var(--fc-daygrid-event-dot-width)/2) solid var(--fc-event-border-color);
                                border-radius: calc(var(--fc-daygrid-event-dot-width)/2);
                                box-sizing: content-box;
                                height: 0px;
                                height: 0px;
                                margin: 0 4px;
                            }

                            .fc-event-time {
                                margin-right: 3px;
                                font-weight: 500;
                            }
                        }

                        .fc-all-day-event {
                            background-color: var(--fc-event-bg-color);
                            border: 1px solid var(--fc-event-border-color);
                            border-radius: 5px;
                            color: var(--fc-event-text-color);
                        }
                    }
                }
            }

            &.is-selected {
                background-color: var(--fc-calendar-selected-bg-color);
            }

        }
    }
}
</style>