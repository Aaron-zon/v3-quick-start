import { computed } from 'vue';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData.js';
import { useLocale } from './use-locale';
import { rangeArr, getPrevMonthLastDays, getMonthDays, toNestedArr } from './use-utils.js';

const { t } = useLocale();

export const useDateTable = (props) => {
    dayjs.extend(localeData)
    const firstDayOfWeek = dayjs.localeData().firstDayOfWeek()
    // 星期标题
    const WEEK_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    /** 
     * 判断是否有日期范围信息
     * @return { boolean }
     */
    const isInRange = computed(() => !!props?.range && !!props?.range?.length)

    /**
     * 返回按行分组的日期
     * @return { Array }
     */
    const rows = computed(() => {
        // 全部显示日期
        let days = [];
        // 有日期范围信息时根据日期范围进行取值
        if (isInRange.value) {
            const [start, end] = props.range;
            const currentMonthRange = rangeArr(
                end.date() - start.date() + 1
            ).map((index) => ({
                text: start.date() + index,
                type: 'current'
            }));

            // 是否满足6行
            const rowLen = 6 - (Math.floor(currentMonthRange.length / 7));
            // 空余几个空位
            let remaining = 7 - (currentMonthRange.length % 7 || 7) + rowLen * 7;

            if (remaining > 0 && rowLen > 0) {
                remaining += (rowLen - 1) * 7
            } else if (remaining == 0 && rowLen > 0) {
                remaining += rowLen * 7
            }

            // 下一月
            const nextMonthRange = rangeArr(
                remaining
            ).map((_, index) => ({
                text: index + 1,
                type: 'next',
            }));

            days = currentMonthRange.concat(nextMonthRange);
        } else {
            const firstDay = props.date.startOf('month').day();
            // 上月
            const prevMonthDays = getPrevMonthLastDays(
                props.date,
                (firstDay - firstDayOfWeek + 7) % 7
            ).map((day) => ({
                text: day,
                type: 'prev',
            }));
            // 本月
            const currentMonthDays = getMonthDays(
                props.date
            ).map((day) => ({
                text: day,
                type: 'current',
            }));
            days = [...prevMonthDays, ...currentMonthDays];

            const rowLen = 6 - (Math.floor(days.length / 7));
            let remaining = 7 - (days.length % 7 || 7);

            if (remaining > 0 && rowLen > 0) {
                remaining += (rowLen - 1) * 7
            } else if (remaining == 0 && rowLen > 0) {
                remaining += rowLen * 7
            }

            // 下一月
            const nextMonthDays = rangeArr(
                remaining
            ).map((_, index) => ({
                text: index + 1,
                type: 'next',
            }));

            days = days.concat(nextMonthDays);
        }
        return toNestedArr(days);
    });

    const weekDays = computed(() => {
        // 获取本地信息，确定一周的第一天是星期几 0 ~ 6（周天 ~ 周六）
        const start = firstDayOfWeek;
        if (0 === start) {
            return WEEK_DAYS.map((_) => t(`fc.datepicker.weeks.${_}`))
        } else {
            return WEEK_DAYS.slice(start)
                .concat(WEEK_DAYS.slice(0, start))
                .map((_) => t(`fc.datepicker.weeks.${_}`))
        }
    });

    return {
        weekDays,
        rows
    }
}