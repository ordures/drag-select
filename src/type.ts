export type IArea = [
  number, // 左上角x
  number, // 左上角y
  number, // 右下角x
  number // 右下角y
]

export type IDragArea = [
  number, // 拖拽起点x
  number, // 拖拽起点y
  number, // 拖拽终点x
  number // 拖拽终点y
]

// dom区域只需要判断从上到下的范围
export type IDomArea = [number, number]

export interface IDragSelectOption {
  // 内容区容器
  container: HTMLElement
  // 设置了overflow的窗口容器
  wrapper?: HTMLElement
  // 拖拽阴影块类名
  dragAreaClass?: string
  // 完成拖拽后的回调
  onSelected?: (selectedDom: HTMLElement[]) => void
}
