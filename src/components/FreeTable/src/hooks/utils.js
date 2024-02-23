/**
 * 判断传入参数是否是number或string类型
 * @param {*} input 
 */
export const checkNumberOrString = (input) => {
    if (typeof input === 'number' || (!isNaN(input) && typeof input !== 'boolean')) {
        return 'Number';
    } else if (typeof input === 'string') {
        return 'String';
    } else {
        return 'Not a valid number or string';
    }
}

