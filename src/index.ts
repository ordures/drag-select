import { IArea, IDomArea, IDragArea, IDragSelectOption } from './type'

// private
let _flag = false
let _dragArea = [0, 0, 0, 0] as IDragArea
const _div = document.createElement('div')
let _rect: DOMRect
let _area: IArea
let _container: HTMLElement
let _wrapper: HTMLElement | undefined
let _onSelected: ((selectedDom: HTMLElement[]) => void) | undefined

function handleMouseDown(event: MouseEvent) {
  _dragArea = [0, 0, 0, 0]
  _area = dragArea2Area(_dragArea)
  _div.style.cssText = `position: absolute;background: gray;opacity: .3;`
  _flag = true
  _dragArea[0] = event.clientX - _rect.left
  _dragArea[1] = event.clientY - _rect.top + (_wrapper?.scrollTop || 0)
}

function handleMouseMove(event: MouseEvent) {
  if (!_flag) {
    return
  }
  _dragArea[2] = event.clientX - _rect.left
  _dragArea[3] = event.clientY - _rect.top + (_wrapper?.scrollTop || 0)
  _area = dragArea2Area(_dragArea)
  _div.style.left = _area[0] + 'px'
  _div.style.top = _area[1] + 'px'
  _div.style.width = _area[2] - _area[0] + 'px'
  _div.style.height = _area[3] - _area[1] + 'px'
}

function handleMouseUp(event: MouseEvent) {
  if (!_flag) {
    return
  }
  _div.style.cssText = 'opacity: 0'
  const domList = Array.from(document.querySelectorAll('.chat-item')) as HTMLElement[]
  const selectedDom = domList.filter((el) => intersectArea(_area, dom2Area(el)))
  _flag = false
  _onSelected?.(selectedDom)
}

function dom2Area(el: HTMLElement): IDomArea {
  const top = el.offsetTop
  const bottom = top + el.offsetHeight
  return [top, bottom]
}
function intersectArea(rect1: IArea, rect2: IDomArea) {
  const minY = rect1[1]
  const maxY = rect1[3]

  const top = rect2[0]
  const bottom = rect2[1]

  return minY <= bottom && maxY >= top
}

function dragArea2Area(dragArea: IDragArea): IArea {
  // 最小的值为左上角
  const minX = Math.min(dragArea[0], dragArea[2])
  const minY = Math.min(dragArea[1], dragArea[3])
  const maxX = Math.max(dragArea[0], dragArea[2])
  const maxY = Math.max(dragArea[1], dragArea[3])

  return [minX, minY, maxX, maxY]
}

export function init({ container, wrapper, dragAreaClass, onSelected }: IDragSelectOption) {
  if (!container) {
    return
  }

  _container = container
  _wrapper = wrapper
  _onSelected = onSelected

  if (dragAreaClass) {
    _div.className = dragAreaClass
  }
  _rect = container.getBoundingClientRect()
  container.appendChild(_div)
  container.addEventListener('mousedown', handleMouseDown)
  container.addEventListener('mousemove', handleMouseMove)
  container.addEventListener('mouseup', handleMouseUp)
}

export function remove() {
  _container.removeEventListener('mousedown', handleMouseDown)
  _container.removeEventListener('mousemove', handleMouseMove)
  _container.removeEventListener('mouseup', handleMouseUp)
}
