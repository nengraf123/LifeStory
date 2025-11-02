// Стили для <html>
    const html = document.documentElement;
    html.style.margin = '0';
    html.style.padding = '0';
    html.style.width = '100%';
    html.style.height = '100%';
    html.style.overflow = 'hidden';

// Стили для <body>
    const body = document.body;
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.width = '100%';
    body.style.height = '100%';
    body.style.overflow = 'hidden';





document.body.innerHTML += `
    <div><br>Привет!</div>
`;





////* WebGL *\\\\

    // Получаем canvas и WebGL контекст
    const canvas = document.getElementById('glCanvas');
    const gl = canvas.getContext('webgl');

    // Проверяем, поддерживается ли WebGL
    if (!gl) {alert('Ваш браузер не поддерживает WebGL'); throw new Error('WebGL не поддерживается');}

    // Устанавливаем размер canvas равным размеру окна
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    // gl.clearColor(0.1, 0.4, 0.4, 1.0);/*цвет*/ gl.clear(gl.COLOR_BUFFER_BIT);/*очистка буфера*/


// ============================================
// ШЕЙДЕРЫ
// ============================================
const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Черный цвет
    }
`;

// ============================================
// КОМПИЛЯЦИЯ И СОЗДАНИЕ ПРОГРАММЫ
// ============================================
function createShader(gl, type, source) {              // Создает шейдер
    const shader = gl.createShader(type);              // Новый шейдер
    gl.shaderSource(shader, source);                   // Загружаем код
    gl.compileShader(shader);                          // Компилируем
    return shader;
}

function createProgram(gl, vs, fs) {                   // Создает программу
    const program = gl.createProgram();                // Новая программа
    gl.attachShader(program, vs);                      // Прикрепляем vertex shader
    gl.attachShader(program, fs);                      // Прикрепляем fragment shader
    gl.linkProgram(program);                           // Связываем
    return program;
}

const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);       // Vertex shader
const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);   // Fragment shader
const program = createProgram(gl, vs, fs);                               // Программа

// ============================================
// СОЗДАЕМ КВАДРАТ
// ============================================
const positions = [                                    // Координаты треугольников
   // Первый треугольник:
    -0.5,  0.5,   // Вершина 1: x=-1, y=-1 (левый нижний угол)
     0.5,  0.5,   // Вершина 2: x= 1, y=-1 (правый нижний угол)
    -0.5, -0.5,   // Вершина 3: x=-1, y= 1  (левый верхний угол)
                                                                
    // Второй треугольник:
     0.5,  0.5,   // Вершина 1: x=-1, y= 1  (левый верхний угол)
    -0.5, -0.5,   // Вершина 2: x= 1, y=-1 (правый нижний угол)
     0.5, -0.5    // Вершина 3: x= 1, y= 1  (правый верхний угол) 
];

const buffer = gl.createBuffer();                      // Создаем буфер
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);               // Активируем буфер
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW); // Загружаем данные

// ============================================
// РИСУЕМ
// ============================================
gl.useProgram(program);                                // Используем программу
const loc = gl.getAttribLocation(program, 'a_position'); // Находим атрибут
gl.enableVertexAttribArray(loc);                       // Включаем атрибут
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0); // Настраиваем атрибут (по 2 числа)
gl.drawArrays(gl.TRIANGLES, 0, 6);                     // Рисуем 6 вершин (2 треугольника)
