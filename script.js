// Element Imports //
const canvas = document.getElementById('canvas')
const clearCanvas = document.getElementById('clear-btn')
const colorPicker = document.getElementById('color-picker')
const selectTool = document.getElementById('select-tool')
const displayTool = document.getElementById('display-tool')
const eraserTool = document.getElementById('eraser-tool')


// Global Variables //
const ctx = canvas.getContext('2d')
let x, y
let size = 10
let color = 'rgba(67, 67, 67, 0.7)'
let isPressed = false
let erasing = false;
const tools = {
  pencil:{name:"Pencil", image:"./assets/pencil.png", size:2, alpha:0.7,},
  pen:{name:"Pen", image:"./assets/pen.png", size:4,},
  brush:{name:"Brush", image:"./assets/brush.png", size:10,alpha:0.2,},
  hightlighter:{name:"Hightlighter", image:"",size:8,alpha:0.4,},
}
let currentTool = tools.pencil

// Canvas //
canvas.addEventListener('pointerdown', (e) => {
  x = e.offsetX
  y = e.offsetY
  isPressed = true
  point(x,y)
})
canvas.addEventListener('pointermove', (e) => {
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
  currentTool = tools[selectTool.value]
  console.log(tools[selectTool.value].name)
  displayTool.src = currentTool.image
  color = hexToRgba(colorPicker.value)
  })

// Color Picker
colorPicker.addEventListener('input',()=>{
  color = hexToRgba(colorPicker.value)
})

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
  ctx.stroke()
}
const hexToRgba = (hexColor) => {
  hexColor = hexColor.replace('#', '');
  let red, green, blue, alpha 
  if (currentTool.name === tools.pencil.name) {
    red = 43
    green = 43
    blue = 43
    alpha = tools.pencil.alpha
    }
    else if (currentTool.name === tools.brush.name) {
      red = parseInt(hexColor.substring(0, 2), 16)
      green = parseInt(hexColor.substring(2, 4), 16)
      blue = parseInt(hexColor.substring(4, 6), 16)
      alpha = tools.brush.alpha
    }
    else if (currentTool.name === tools.hightlighter.name) {
      red = parseInt(hexColor.substring(0, 2), 16)
      green = parseInt(hexColor.substring(2, 4), 16)
      blue = parseInt(hexColor.substring(4, 6), 16)
      alpha = tools.hightlighter.alpha
    }
    else{
      red = parseInt(hexColor.substring(0, 2), 16)
      green = parseInt(hexColor.substring(2, 4), 16)
      blue = parseInt(hexColor.substring(4, 6), 16)
      alpha = 1
    }
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

