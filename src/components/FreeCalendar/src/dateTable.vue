<script setup>
import { useDateTable } from './hooks/use-date-table.js'
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
    }
});
const emit = defineEmits(['pick'])
const {
    weekDays,
    rows
} = useDateTable(props, emit);
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
                <td class="fc-col" v-for="(cell, key) in row" :key="key">
                    <div class="fc-daygrid-day-frame">
                        <slot name="date-cell">
                            <div class="fc-daygrid-day-top" :class="{'fc-current-date': cell.type == 'current'}">{{ cell.text }}</div>
                        </slot>
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
                    box-sizing: border-box;
                    padding: 0 5px;
                    margin: 3px 0;
                    text-align: right;
                    height: 24px;
                    opacity: .3;
                }
                
                .fc-current-date {
                    opacity: 1;
                }
            }

        }
    }
}
</style>