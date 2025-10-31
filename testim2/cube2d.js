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


    gl.clearColor(0.1, 0.4, 0.4, 1.0);/*цвет*/ gl.clear(gl.COLOR_BUFFER_BIT);/*очистка буфера*/



    // ============================================
    // ШАГ 1: ПИШЕМ ШЕЙДЕРЫ (это просто текст!)
    // ============================================

    // VERTEX SHADER - обрабатывает позиции вершин
    const vertexShaderSource = `
      attribute vec2 a_position;  // Входные координаты вершины
      
      void main() {
        // gl_Position - ОБЯЗАТЕЛЬНАЯ выходная переменная
        // Преобразуем 2D координаты в 4D (x, y, z, w)
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // FRAGMENT SHADER - определяет цвет каждого пикселя
    const fragmentShaderSource = `
      precision mediump float;  // Точность вычислений
      
      void main() {
        // gl_FragColor - ОБЯЗАТЕЛЬНАЯ выходная переменная для цвета
        gl_FragColor = vec4(0.3, 0.3, 0.3, 1.0);
      }
    `;

    // ============================================
    // ШАГ 2: КОМПИЛИРУЕМ ШЕЙДЕРЫ
    // ============================================

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);  // Создаем шейдер
      gl.shaderSource(shader, source);       // Загружаем код
      gl.compileShader(shader);              // Компилируем
      
      // Проверяем ошибки
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Ошибка шейдера:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    // Компилируем оба шейдера
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // ============================================
    // ШАГ 3: СОЗДАЕМ ПРОГРАММУ (связываем шейдеры)
    // ============================================

    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);     // Прикрепляем vertex shader
      gl.attachShader(program, fragmentShader);   // Прикрепляем fragment shader
      gl.linkProgram(program);                    // Связываем их вместе
      
      // Проверяем ошибки
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Ошибка программы:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);

    // ============================================
    // ШАГ 4: СОЗДАЕМ ДАННЫЕ КВАДРАТА
    // ============================================

    // Находим где в шейдере находится переменная a_position
    const positionLocation = gl.getAttribLocation(program, 'a_position');

    // Создаем буфер для хранения координат
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Координаты квадрата (2 треугольника)
    // Координаты от -1 до 1
    const positions = [
      // Треугольник 1
      -0.5, -0.5,  // Левый нижний
       0.5, -0.5,  // Правый нижний
      -0.5,  0.5,  // Левый верхний
      
      // Треугольник 2
      -0.5,  0.5,  // Левый верхний
       0.5, -0.5,  // Правый нижний
       0.5,  0.5,  // Правый верхний
    ];

    // Отправляем данные в буфер GPU
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // ============================================
    // ШАГ 5: РИСУЕМ КВАДРАТ!
    // ============================================

    // Очищаем canvas
    gl.clearColor(0.1, 0.4, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Говорим WebGL использовать нашу программу
    gl.useProgram(program);

    // Включаем атрибут позиции
    gl.enableVertexAttribArray(positionLocation);

    // Связываем буфер с атрибутом
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Объясняем как читать данные из буфера
    gl.vertexAttribPointer(
      positionLocation,  // Куда передавать данные
      2,                 // 2 числа на вершину (x, y)
      gl.FLOAT,          // Тип данных
      false,             // Не нормализовать
      0,                 // Шаг (0 = автоматически)
      0                  // Смещение с начала буфера
    );

    // РИСУЕМ!
    gl.drawArrays(
      gl.TRIANGLES,  // Рисуем треугольники
      0,             // Начинаем с первой вершины
      6              // Всего 6 вершин (2 треугольника × 3)
    );

    console.log('✅ Красный квадрат нарисован!');

