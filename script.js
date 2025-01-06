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
  highlighter:{name:"Hightlighter", image:"./assets/highlighter.jpg",size:8,alpha:0.4,},
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
canvas.addEventListener('pointerup', () => {
  isPressed = false
  x = undefined
  y = undefined
})
eraserTool.addEventListener('click', () => {
  erasing = !erasing;
  if (erasing) {
    currentTool = { name: "Eraser", size: 10, alpha: 1 };
    color = 'rgba(255, 255, 255, 1)';
  } else {
    currentTool = tools[selectTool.value];
    color = hexToRgba(colorPicker.value);
  }
});

// Intensity Slider
const intensitySlider = document.getElementById('intensity-slider');
intensitySlider.addEventListener('input', () => {
  const intensity = intensitySlider.value / 100;
  if (currentTool.name !== "Eraser") {
    color = hexToRgba(colorPicker.value, intensity);
  }
});

const hexToRgba = (hexColor, intensity = 1) => {
  hexColor = hexColor.replace('#', '');
  let red = parseInt(hexColor.substring(0, 2), 16);
  let green = parseInt(hexColor.substring(2, 4), 16);
  let blue = parseInt(hexColor.substring(4, 6), 16);
  let alpha;

  if (currentTool.name === tools.pencil.name) {
    alpha = tools.pencil.alpha * intensity;
  } else if (currentTool.name === tools.brush.name) {
    alpha = tools.brush.alpha * intensity;
  } else if (currentTool.name === tools.hightlighter.name) {
    alpha = tools.hightlighter.alpha * intensity;
  } else {
    alpha = currentTool.alpha ? currentTool.alpha * intensity : intensity;
  }

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

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
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

const setToolSize = (newSize) => {
  size = newSize;
};

// Set initial tool to pencil
currentTool = tools.pencil;
setToolSize(currentTool.size);
displayTool.src = currentTool.image;
color = hexToRgba(colorPicker.value);

selectTool.addEventListener('change', () => {
  currentTool = tools[selectTool.value];
  setToolSize(currentTool.size);
  console.log(tools[selectTool.value].name);
  displayTool.src = currentTool.image;
  color = hexToRgba(colorPicker.value);
});


const line = (x1, y1, x2, y2) => {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.stroke()

}

