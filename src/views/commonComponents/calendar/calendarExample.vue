<script setup>
import { ref } from 'vue';
import { BaseCalendar } from '@/components/FreeCalendar'
const date = ref('2023-05-05');
</script>

<template>
    <div class="app-container">
        <div class="calendar">
            <BaseCalendar v-model="date"></BaseCalendar>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.calendar {
    max-width: 1100px;
    margin: 0 auto;
}
</style>