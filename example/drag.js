// private
var _flag = false;
var _dragArea = [0, 0, 0, 0];
var _div = document.createElement('div');
var _rect;
var _area;
var _container;
var _wrapper;
var _onSelected;
function handleMouseDown(event) {
    _dragArea = [0, 0, 0, 0];
    _area = dragArea2Area(_dragArea);
    _div.style.cssText = "position: absolute;background: gray;opacity: .3;";
    _flag = true;
    _dragArea[0] = event.clientX - _rect.left;
    _dragArea[1] = event.clientY - _rect.top + ((_wrapper === null || _wrapper === void 0 ? void 0 : _wrapper.scrollTop) || 0);
}
function handleMouseMove(event) {
    if (!_flag) {
        return;
    }
    _dragArea[2] = event.clientX - _rect.left;
    _dragArea[3] = event.clientY - _rect.top + ((_wrapper === null || _wrapper === void 0 ? void 0 : _wrapper.scrollTop) || 0);
    _area = dragArea2Area(_dragArea);
    _div.style.left = _area[0] + 'px';
    _div.style.top = _area[1] + 'px';
    _div.style.width = _area[2] - _area[0] + 'px';
    _div.style.height = _area[3] - _area[1] + 'px';
}
function handleMouseUp(event) {
    if (!_flag) {
        return;
    }
    _div.style.cssText = 'opacity: 0';
    var domList = Array.from(document.querySelectorAll('.chat-item'));
    var selectedDom = domList.filter(function (el) { return intersectArea(_area, dom2Area(el)); });
    _flag = false;
    _onSelected === null || _onSelected === void 0 ? void 0 : _onSelected(selectedDom);
}
function dom2Area(el) {
    var top = el.offsetTop;
    var bottom = top + el.offsetHeight;
    return [top, bottom];
}
function intersectArea(rect1, rect2) {
    var minY = rect1[1];
    var maxY = rect1[3];
    var top = rect2[0];
    var bottom = rect2[1];
    return minY <= bottom && maxY >= top;
}
function dragArea2Area(dragArea) {
    // 最小的值为左上角
    var minX = Math.min(dragArea[0], dragArea[2]);
    var minY = Math.min(dragArea[1], dragArea[3]);
    var maxX = Math.max(dragArea[0], dragArea[2]);
    var maxY = Math.max(dragArea[1], dragArea[3]);
    return [minX, minY, maxX, maxY];
}
function init(_a) {
    var container = _a.container, wrapper = _a.wrapper, dragAreaClass = _a.dragAreaClass, onSelected = _a.onSelected;
    if (!container) {
        return;
    }
    _container = container;
    _wrapper = wrapper;
    _onSelected = onSelected;
    if (dragAreaClass) {
        _div.className = dragAreaClass;
    }
    _rect = container.getBoundingClientRect();
    container.appendChild(_div);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
}
function remove() {
    _container.removeEventListener('mousedown', handleMouseDown);
    _container.removeEventListener('mousemove', handleMouseMove);
    _container.removeEventListener('mouseup', handleMouseUp);
}

export { init, remove };
//# sourceMappingURL=drag.js.map
