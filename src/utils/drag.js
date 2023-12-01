export function drag(boxDom, mainDom) {
    // 鼠标与物体边界距离
    boxDom.onmousedown = function (event) {
        console.log('xxx')
        var tarX = 0;
        var tarY = 0;
        // 鼠标距离窗口的XY轴0坐标的距离 box_dis
        var clientX = event.clientX
        var clientY = event.clientY
        // box距离窗口XY轴的距离 box_2_doc_dis
        tarX = boxDom.offsetLeft;
        tarY = boxDom.offsetTop;

        mainDom.onmousemove = function (ev) {
            // 用现在鼠标到窗口的距离 - 以前鼠标到窗口的距离 获得鼠标移动的距离  doc_dis - box_dis = traveled_dis
            // 用原来box到窗口的距离 + 鼠标移动的距离 得到当前box距离窗口的距离 box_2_doc_dis + traveled_dis
            var x = tarX + ev.clientX - clientX;
            var y = tarY + ev.clientY - clientY;
            var maxX = mainDom.offsetWidth - boxDom.offsetWidth;
            var maxY = mainDom.offsetHeight - boxDom.offsetHeight;
            // 将box限制在main内
            if (x >= maxX) {
                x = maxX;
            } else if (x <= 0) {
                x = 0;
            }
            if (y > maxY) {
                y = maxY;
            } else if (y < 0) {
                y = 0;
            }

            boxDom.style.left = x + 'px';
            boxDom.style.top = y + 'px';
        }

        // 鼠标抬起 清除事件
        mainDom.onmouseup = function (ev) {
            mainDom.onmousemove = null;
            mainDom.onmouseup = null;
        }
    }
}