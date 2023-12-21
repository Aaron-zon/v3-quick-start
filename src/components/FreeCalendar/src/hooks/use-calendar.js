import { ref, computed } from 'vue';
import dayjs, { Dayjs } from 'dayjs'
import { useLocale } from './use-locale'

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

    const prevMonthDayjs = computed(() => date.value.subtract(1, 'month').date(1));
    const nextMonthDayjs = computed(() => date.value.add(1, 'month').date(1));
    const prevYearDayjs = computed(() => date.value.subtract(1, 'year').date(1));
    const nextYearDayjs = computed(() => date.value.add(1, 'year').date(1));

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

    /**
     * 检查日期范围
     */
    const validatedRange = computed(() => {
        if (!props.range) return [];
        const rangeArrDayjs = props.range.map((_) => dayjs(_).locale(lang.value));
        const [startDayjs, endDayjs] = rangeArrDayjs;
        // 查看时间范围的前后顺序是否正常
        if (startDayjs.isAfter(endDayjs)) {
            console.warn('end time should be greater than start time');
            return [];
        }

        // 开始时间和结束时间在同一个月时
        if (startDayjs.isSame(endDayjs, 'month')) {
            // same month
            calculateValidatedDateRange(startDayjs, endDayjs)
        } else { // 开始时间和结束时间不再在同一个月时
            // tow months
            if (startDayjs.add(1, 'month').month() !== endDayjs.month()) {
                console.warn('start time and end time interval must not exceed two months');
                return [];
            }

            return calculateValidatedDateRange(startDayjs, endDayjs);
        }
    })

    /**
     * 通过传入的开始日期和结束日期，验证日期范围
     * @param { Dayjs } startDayjs 
     * @param { Dayjs } endDayjs 
     * @returns 
     */
    const calculateValidatedDateRange = (startDayjs, endDayjs) => {
        const firstDay = startDayjs.startOf('week');
        const lastDay = endDayjs.endOf('week');
        const firstMonth = firstDay.get('month');
        const lastMonth = lastDay.get('month');

        if (firstMonth === lastMonth) { // 在同一月
            return [[firstDay, lastDay]]
        }
        else if ((firstMonth + 1) % 12 === lastMonth) { // 前后两个月
            return adjacentMonth(firstDay, lastDay);
        }
        else if (firstMonth + 2 === lastMonth || (firstMonth + 1) % 11 === lastMonth) { // 前后三个月
            return threeConsecutiveMonth(firstDay, lastDay);
        } else {
            console.warn('start time and end time interval must not exceed two months');
            return [];
        }
    }

    /**
     * 分别获取两个月份的日期范围
     * @param { Dayjs } start 
     * @param { Dayjs } end 
     * @returns 返回一个数组，第一位存放第一个月的开始/结束日期，第二位存放第二个月的开始/结束日期
     */
    const adjacentMonth = (start, end) => {
        // 开始月的最后一天
        const firstMonthLastDay = start.endOf('month');
        // 结束月的第一天
        const lastMonthFirstDay = end.startOf('month');
        // 查看这两天是否在同一周
        const isSameWeek = firstMonthLastDay.isSame(lastMonthFirstDay, 'week');
        // 判断是否在同一周
        const lastMonthStartDay = isSameWeek
            ? lastMonthFirstDay.add(1, 'week') // 如果在同一周: 获取lastMonthFirstDay后1星期的日期
            : lastMonthFirstDay // 如果不再同一周：返回lastMonthFirstDay
            ;

        // 返回开始月和结束月的日期范围
        return [
            [start, firstMonthLastDay], // 开始月的开始日期和结束日期
            [lastMonthStartDay.startOf('week'), end] // 结束月的开始日期和结束日期
        ];
    }


    /**
     * 
     * @param {*} start 
     * @param {*} end 
     */
    const threeConsecutiveMonth = (start, end) => {

        return [];
    }

    /**
     * 选定日期
     * @param { Dayjs } day 
     */
    const pickDay = (day) => {
        realSelectedDay.value = day
    }

    /**
     * 切换 年/月
     * @param { String } type 
     */
    const selectDate = (type) => {
        const dateMap = {
            'prev-month': prevMonthDayjs.value,
            'next-month': nextMonthDayjs.value,
            'prev-year': prevYearDayjs.value,
            'next-year': nextYearDayjs.value,
            'today': now
        };

        const day = dateMap[type];
        // 检查和当前显示用的date是否为同一天
        if (!day.isSame(date.value, 'day')) {
            pickDay(day);
        }
    }

    return {
        date,
        realSelectedDay,
        selectDate,
        pickDay,
    }
}