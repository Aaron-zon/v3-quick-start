import { Prev, Next, Today, Title, DayGridMonth, TimeGridWeek, TimeGridDay, ListWeek } from '../components/Header';
export const useComponent = () => {
    const componentMap = {
        'prev': Prev,
        'next': Next,
        'today': Today,
        'title': Title,
        'dayGridMonth': DayGridMonth,
        'timeGridWeek': TimeGridWeek,
        'timeGridDay': TimeGridDay,
        'listWeek': ListWeek,
    }
    return {
        componentMap
    }
}


