import { init, remove } from './drag.js'
const containerDom = document.querySelector('.chat-content')
const wrapperDom = document.querySelector('.chat-container')

const handleSelected = (dom) => {
  console.log('dom: ', dom)
}

if (containerDom && wrapperDom) {
  init({
    container: containerDom,
    wrapper: wrapperDom,
    dragAreaClass: 'drag-area',
    onSelected: handleSelected,
  })
  window.remove = remove
}
