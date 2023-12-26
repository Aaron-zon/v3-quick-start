<script setup>
import { ref } from 'vue';
import { BaseCalendar, FreeCalendar } from '@/components/FreeCalendar'
const date = ref('');
const headerToolbar = {
    left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    center: 'today prev,next',
    right: 'title',
}
const buttonText = {
    prev: 'AAA', // 上一月按钮
    next: 'Next', // 下一月按钮
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    list: 'List'
}

const events = [
    {
        start: '2023-12-22T10:30:00',
        title: '任务描述',
    },
    {
        start: '2023-12-24T10:30:00',
        end: '2023-12-24T12:30:00',
        title: '任务描述',
        time: '10:30a'
    },
    {
        start: '2023-12-25T16:00:00',
        end: '2023-12-25T17:30:00',
        title: '任务描述',
    },
    {
        start: '2023-12-05',
        end: '2023-12-05',
        title: '游玩',
    },
    {
        start: '2023-12-25T08:00:00',
        end: '2023-12-25T10:30:00',
        title: '任务描述',
    },
]
// 2023-05-05
</script>

<template>
    <div class="app-container">
        <div class="calendar">
            <!-- <BaseCalendar v-model="date"></BaseCalendar> -->
            <FreeCalendar v-model="date" :events="events"></FreeCalendar>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.calendar {
    max-width: 1100px;
    margin: 0 auto;
}
</style>