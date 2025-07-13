// webGL
//     <canvas id="webGL" width="800" height="600">твой браузер не поддерживает html5</canvas>
    // <script src="./main.js"></script>

console.log('Hi!');

// 1. Создаём новый div
const div1 = document.createElement('div')
div1.textContent = 'Привет, это новый div!'
div1.setAttribute('class', 'nachalo')
document.body.appendChild(div1)


// <button onclick="window.location.href='./index.html'">Перейти</button> */}
const button1 = document.createElement('button')
button1.textContent = 'Привет'
// button1.setAttribute('onclick', './index.html');
button1.onclick = () => {window.location.href = '../index.html'};
document.body.appendChild(button1)


// Получаем WebGL-контекст из canvas с id="c"
const gl = webGL.getContext("webgl");

// Вершинный шейдер: отвечает за позицию каждой вершины и передачу цвета дальше
const vs = `
attribute vec2 p;      // позиция вершины (x, y)
attribute vec3 color;  // цвет вершины (r, g, b)
varying vec3 vColor;   // переменная для передачи цвета во фрагментный шейдер

void main() {
  gl_Position = vec4(p, 0, 1); // задаём позицию вершины в пространстве отсечения
  vColor = color;               // передаём цвет дальше
}`;

// Фрагментный шейдер: отвечает за цвет каждого пикселя
const fs = `
precision mediump float; // точность чисел с плавающей точкой
varying vec3 vColor;     // получаем цвет из вершинного шейдера

void main() {
  gl_FragColor = vec4(vColor, 1); // устанавливаем цвет пикселя с полной непрозрачностью
}`;

// Функция для создания и компиляции шейдера (вершинного или фрагментного)
function sh(type, src) {
  let s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

// Создаём программу и прикрепляем к ней шейдеры
const prog = gl.createProgram();
gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
gl.linkProgram(prog);
gl.useProgram(prog);

// Создаём массив с данными о вершинах треугольника:
// для каждой вершины: x, y, r, g, b
const verts = new Float32Array([
  0, 0.8,  1, 0, 0,   // вершина 1: позиция (0, 0.8), цвет красный
 -0.8, -0.8, 0, 1, 0, // вершина 2: позиция (-0.8, -0.8), цвет зелёный
  0.8, -0.8, 0, 0, 1  // вершина 3: позиция (0.8, -0.8), цвет синий
]);

// Создаём буфер и загружаем в него данные о вершинах
const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

// Получаем расположение атрибута "p" (позиция) в шейдере
const pLoc = gl.getAttribLocation(prog, "p");
// Указываем, как читать данные позиции из буфера:
// 2 компоненты (x,y), тип float, без нормализации, шаг 20 байт (5 чисел * 4 байта),
// смещение 0 (позиция начинается с первого числа в массиве)
gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 20, 0);
gl.enableVertexAttribArray(pLoc); // включаем атрибут

// Получаем расположение атрибута "color" (цвет) в шейдере
const cLoc = gl.getAttribLocation(prog, "color");
// Указываем, как читать данные цвета из буфера:
// 3 компоненты (r,g,b), тип float, без нормализации, шаг 20 байт,
// смещение 8 байт (2 числа позиции * 4 байта)
gl.vertexAttribPointer(cLoc, 3, gl.FLOAT, false, 20, 8);
gl.enableVertexAttribArray(cLoc); // включаем атрибут

// Очищаем экран (по умолчанию чёрный)
gl.clear(gl.COLOR_BUFFER_BIT);

// Рисуем треугольник из 3 вершин
gl.drawArrays(gl.TRIANGLES, 0, 3);

