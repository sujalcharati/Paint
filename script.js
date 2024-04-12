// Element Imports //
const canvas = document.getElementById('canvas')
const clearCanvas = document.getElementById('clear-btn')
const colorPicker = document.getElementById('color-picker')
const selectTool = document.getElementById('select-tool')
const displayTool = document.getElementById('display-tool')


// Global Variables //
const ctx = canvas.getContext('2d')
let x, y
let size = 10
let color = colorPicker.value
let isPressed = false
const tools = {
  pencil:{name:"Pencil", image:"./assets/pencil.png", size:"2",},
  pen:{name:"Pen", image:"./assets/pen.png", size:"2",},
  brush:{name:"Brush", image:"./assets/brush.png", size:"2",},
  hightlighter:{name:"Hightlighter", image:"",size:"2",},
}


// Canvas //
canvas.addEventListener('pointerdown', (e) => {
  x = e.offsetX
  y = e.offsetY 
  isPressed = true
  point(x, y)
})
canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX
    const y2 = e.offsetY
    line(x, y, x2, y2)
    x = x2
    y = y2
  }
})
canvas.addEventListener('pointerup', (e) => {
  isPressed = false
  x = undefined
  y = undefined
})


// Tools //

// Display Tools
selectTool.addEventListener('change',()=>{
  switch (selectTool.value) {
    case 'pencil':
      displayTool.src = tools.pencil.image
      break;
case 'pen':
      displayTool.src = tools.pen.image
      break;
case 'hightlighter':
      displayTool.src = tools.hightlighter.image
      break;
case 'brush':
      displayTool.src = tools.brush.image
      break;
    default:
      displayTool.src = tools.pencil.image
      break;
  }
})

// Color Picker
colorPicker.addEventListener('input',()=>color=colorPicker.value)

// Clear Button //
clearCanvas.addEventListener('click',()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height)
  isPressed = false
  x = undefined
  y = undefined
})


//Functions//
const point = (x, y) => {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}
const line = (x1, y1, x2, y2) => {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.stroke()
}
