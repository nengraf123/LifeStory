const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Описание кнопок
const buttons = [
  { x: 10,  y: 10, width: 200, height: 50, color: '#3498db', label: 'Кнопка 1', hovered: false },
  { x: 10, y: 70, width: 200, height: 50, color: '#e67e22', label: 'Кнопка 2', hovered: false },
  { x: 10, y: 130, width: 200, height: 50, color: '#f2f', label: 'Кнопка 3', hovered: false },
  { x: 10, y: 190, width: 200, height: 50, color: '#e67', label: 'Кнопка 4', hovered: false },
  { x: 10, y: 250, width: 200, height: 50, color: '#a22', label: 'Кнопка 5', hovered: false },
  { x: 10, y: 310, width: 200, height: 50, color: '#e22', label: 'Кнопка 6', hovered: false },
  { x: 10, y: 370, width: 200, height: 50, color: '#a2f', label: 'Кнопка 7', hovered: false },
  { x: 10, y: 430, width: 200, height: 50, color: '#f9f', label: 'Кнопка 8', hovered: false },
  { x: 10, y: 490, width: 200, height: 50, color: '#99f', label: 'Кнопка 8', hovered: false },
  { x: 10, y: 550, width: 200, height: 50, color: '#f99', label: 'Кнопка 8', hovered: false },
];

// Функция для рисования одной кнопки
function drawButton(btn) {
  // Если кнопка под мышкой — делаем цвет светлее
  ctx.fillStyle = btn.hovered ? lightenColor(btn.color, 0.4) : btn.color;
  ctx.fillRect(btn.x, btn.y, btn.width, btn.height);

  ctx.strokeStyle = '#222';
  ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);

  ctx.fillStyle = '#fff';
  ctx.font = '18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(btn.label, btn.x + btn.width/2, btn.y + btn.height/2);
}

// Функция для осветления цвета (значение от 0 до 1)
function lightenColor(color, percent) {
  let num = parseInt(color.slice(1),16),
      amt = Math.round(255 * percent),
      R = Math.min(255, (num >> 16) + amt),
      G = Math.min(255, ((num >> 8) & 0x00FF) + amt),
      B = Math.min(255, (num & 0x0000FF) + amt);
  return `rgb(${R},${G},${B})`;
}

// Проверка, находится ли точка внутри кнопки
function isInsideButton(btn, x, y) {
  return x >= btn.x && x <= btn.x + btn.width && y >= btn.y && y <= btn.y + btn.height;
}

// Перерисовка всех кнопок
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  buttons.forEach(drawButton);
}

// Обработка движения мыши
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  let changed = false;
  buttons.forEach(btn => {
    const wasHovered = btn.hovered;
    btn.hovered = isInsideButton(btn, mx, my);
    if (wasHovered !== btn.hovered) changed = true;
  });
  if (changed) draw();
});

// Перерисовать изначально
draw();

