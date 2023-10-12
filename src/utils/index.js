/** 将全局 CSS 变量导入JS中使用 */
export function getCssVariableValue(cssVariableName) {
    let cssVariableValue = '';
    try {
        cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(
            cssVariableName,
        );
    } catch (error) {
        console.error(error);
    }

    return cssVariableValue;
}
