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
    // VERTEX SHADER - обрабатывает позиции
    // ============================================
    const vertexShaderSource = `
        attribute vec2 a_position;
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    // ============================================
    // FRAGMENT SHADER - определяет цвет
    // ============================================
    const fragmentShaderSource = `
        precision mediump float;
        void main() {
            // Простой черный цвет
            vec3 col = vec3(0.0, 0.0, 0.0);
            gl_FragColor = vec4(col, 1.0);
        }
    `;

    // ============================================
    // Компилируем шейдеры
    // ============================================
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
      
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Ошибка шейдера:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // ============================================
    // Создаем программу
    // ============================================
    function createProgram(gl, vertexShader, fragmentShader) {
          const program = gl.createProgram();
          gl.attachShader(program, vertexShader);
          gl.attachShader(program, fragmentShader);
          gl.linkProgram(program);
      
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Ошибка программы:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        return program;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);

    // ============================================
    // Создаем квадрат
    // ============================================
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Координаты квадрата (весь экран)
    const positions = [
       -1, -1,
        1, -1,
       -1,  1,
       -1,  1,
        1, -1,
        1,  1,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // ============================================
    // Рисуем
    // ============================================

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    console.log('✅ Черный квадрат нарисован!');

