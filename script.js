const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

let x, y;
let size = 10;
let color = 'black';
let isPressed = false;

canvas.addEventListener('pointerdown', (e) => {
  const rect = canvas.getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  isPressed = true;
  point(x, y);
});

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const rect = canvas.getBoundingClientRect();
    const x2 = e.clientX - rect.left;
    const y2 = e.clientY - rect.top;
    line(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

canvas.addEventListener('pointerup', (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

const point = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

const line = (x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
};
