import { isDate } from './use-utils.js'

/**
 * 检查传入参数是否是一个时间范围的数组
 * 有且只有两位，每一位都是Date类型
 * @param { Array } range 
 * @returns 
 */
export const rangeValidator = (range) => {
    return Array.isArray(range) && range.length === 2 && range.every((item) => isDate(item));
}