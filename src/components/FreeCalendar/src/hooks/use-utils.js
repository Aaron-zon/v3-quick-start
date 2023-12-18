import { Dayjs } from "dayjs";

/**
 * 获取范围内数组
 * @param { Number } n 
 * @returns 
 */
export const rangeArr = (n) => Array.from(Array.from({ length: n }).keys());

/**
 * 每七个分为一组
 * @param { Array } days 
 * @returns 
 */
export const toNestedArr = (days) => {
    return rangeArr(
        days.length / 7
    ).map((index) => {
        const start = index * 7
        return days.slice(start, start + 7)
    })
}

/**
 * 判断传入参数是否为Date类型
 * @param {Object} value 
 * @returns 
 */
export const isDate = (value) => {
    return value instanceof Date;
}

// date table

/**
 * 获取上个月应该显示的日期集合
 * @param { Dayjs } date 
 * @param { Number } count 
 * @returns 
 */
export const getPrevMonthLastDays = (date, count) => {
    const lastDay = date.subtract(1, 'month').endOf('month').date();
    return rangeArr(count).map((_, index) => lastDay - (count - index - 1));
}

/**
 * 根据传入的Dayjs对象获取当月的日期
 * @param { Dayjs } date 
 * @returns 
 */
export const getMonthDays = (date) => {
    // 获取date月份的天数
    const days = date.daysInMonth()
    return rangeArr(days).map((_, index) => index + 1)
}
