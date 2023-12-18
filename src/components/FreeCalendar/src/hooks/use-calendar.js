import { ref, computed } from 'vue';
import dayjs from 'dayjs'
import { useLocale } from './use-locale'
import { Dayjs } from 'dayjs';


const { lang } = useLocale();
const now = dayjs().locale(lang.value)

export const useCalendar = (props, emit) => {
    // 选择的日期
    const selectedDay = ref();

    /**
     * 当前日期
     */
    const date = computed(() => {
        if (!props.modelValue) {
            return realSelectedDay.value || (validatedRange.value.length ? validatedRange.value[0][0] : now)
        } else {
            return dayjs(props.modelValue).locale(lang.value)
        }
    });

    /**
     * 真实选定日期
     */
    const realSelectedDay = computed({
        get() {
            if (!props.modelValue) return realSelectedDay.value;
            return date.value;
        },
        /**
         * 
         * @param { Dayjs } val 
         * @returns 
         */
        set(val) {
            if (!val) return;
            selectedDay.value = val;
            const result = val.toDate();
            emit('input', result);
            emit('update:modelValue', result);
        }
    })

    const validatedRange = computed(() => {
        if (!props.range) return [];
        const rangeArrDayjs = props.range.map((_) => dayjs(_).locale(lang.value));
        const [startDayjs, endDayjs] = rangeArrDayjs;
        if (startDayjs.isAfter(endDayjs)) {
            console.warn('end time should be greater than start time');
            return [];
        }

        if (startDayjs.isSame(endDayjs, 'month')) {
            // same month
            calculateValidatedDateRange(startDayjs, endDayjs)
        } else {
            // tow months
        }
    })

    /**
     * 通过传入的开始日期和结束日期，验证日期范围
     * @param { Dayjs } startDayjs 
     * @param { Dayjs } endDayjs 
     * @returns 
     */
    const calculateValidatedDateRange = (startDayjs, endDayjs) => {

        return [];
    }

    return {
        date,
        realSelectedDay
    }
}