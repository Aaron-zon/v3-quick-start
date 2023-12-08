let oldWidth, oldHeight, oldX, oldY, oldLeft, oldTop, minWidth, minHeight, maxWidth, maxHeight, params;

export function dragZoom({ content, childs, minW, minH, maxW, maxH }) {
    params = { content, childs, minW, minH, maxW, maxH };
    for (let child of childs) {
        mousedown(content, child)
    }
}


/**
 * 
 * @param {HTMLElement} content 
 * @param {HTMLElement} child 
 */
function mousedown(content, child) {
    child.addEventListener('mousedown', function (e) {
        // 阻止事件冒泡
        e.stopPropagation();
        // 获取移动前盒子的宽高
        oldWidth = content.offsetWidth;
        oldHeight = content.offsetHeight;

        // 获取鼠标距离屏幕的left和top值
        oldX = e.clientX;
        oldY = e.clientY;

        // 元素相对于最近的父级定位
        oldLeft = content.offsetLeft;
        oldTop = content.offsetTop;

        minWidth = params.minW;
        minHeight = params.minH;
        maxWidth = params.maxW;
        maxHeight = params.maxH;

        document.onmousemove = function (event) {
            var newWidth, newHeight;

            if (child.className.includes('nw') || child.className.includes('sw')) {
                // 左上角和左下角
                newWidth = oldWidth - (event.clientX - oldX);
                newHeight = (newWidth / oldWidth) * oldHeight;
                if (minWidth > newWidth || minHeight > newHeight) {
                    return;
                } else if (maxWidth < newWidth || maxHeight < newHeight) {
                    return;
                }
                content.style.width = newWidth + 'px';
                content.style.height = newHeight + 'px';

                // 左上角的位置
                content.style.left = oldLeft + (oldWidth - newWidth) + 'px';
                content.style.top = oldTop + (oldHeight - newHeight) + 'px';

            } else if (child.className.includes('ne') || child.className.includes('se')) {
                console.log('dasda')
                // 右上角和右下角
                newWidth = oldWidth + (event.clientX - oldX);
                newHeight = (newWidth / oldWidth) * oldHeight;

                if (minWidth > newWidth || minHeight > newHeight) {
                    return;
                } else if (maxWidth < newWidth || maxHeight < newHeight) {
                    return;
                }

                content.style.width = newWidth + 'px';
                content.style.height = newHeight + 'px';
            }
        }

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        }

    })
}