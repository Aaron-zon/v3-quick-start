/**
 * 防抖
 * @param {Function} fn 要进行防抖的方法
 * @param {Number} duration 默认时间
 * @returns 
 */
export default function (fn, duration = 100) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, duration)
    }
}