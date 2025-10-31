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



// Шейдеры
    const vertexShaderSource = `
      attribute vec3 aPosition;
      attribute vec3 aColor;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      varying vec3 vColor;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
        vColor = aColor;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      varying vec3 vColor;

      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }
    `;

    // Создание шейдера
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

// Программа
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);

    // Вершины куба (позиция + цвет)
    const vertices = new Float32Array([
      // Передняя грань (красная)
      -1, -1,  1,  1, 0, 0,
       1, -1,  1,  1, 0, 0,
       1,  1,  1,  1, 0, 0,
      -1,  1,  1,  1, 0, 0,

      // Задняя грань (зелёная)
      -1, -1, -1,  0, 1, 0,
      -1,  1, -1,  0, 1, 0,
       1,  1, -1,  0, 1, 0,
       1, -1, -1,  0, 1, 0,

      // Верхняя грань (синяя)
      -1,  1, -1,  0, 0, 1,
      -1,  1,  1,  0, 0, 1,
       1,  1,  1,  0, 0, 1,
       1,  1, -1,  0, 0, 1,

      // Нижняя грань (жёлтая)
      -1, -1, -1,  1, 1, 0,
       1, -1, -1,  1, 1, 0,
       1, -1,  1,  1, 1, 0,
      -1, -1,  1,  1, 1, 0,

      // Правая грань (фиолетовая)
       1, -1, -1,  1, 0, 1,
       1,  1, -1,  1, 0, 1,
       1,  1,  1,  1, 0, 1,
       1, -1,  1,  1, 0, 1,

      // Левая грань (голубая)
      -1, -1, -1,  0, 1, 1,
      -1, -1,  1,  0, 1, 1,
      -1,  1,  1,  0, 1, 1,
      -1,  1, -1,  0, 1, 1,
    ]);

    const indices = new Uint16Array([
      0,  1,  2,    0,  2,  3,   // перед
      4,  5,  6,    4,  6,  7,   // зад
      8,  9, 10,    8, 10, 11,   // верх
     12, 13, 14,   12, 14, 15,   // низ
     16, 17, 18,   16, 18, 19,   // право
     20, 21, 22,   20, 22, 23    // лево
    ]);

    // Буфер вершин
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionAttrib = gl.getAttribLocation(program, "aPosition");
    const colorAttrib = gl.getAttribLocation(program, "aColor");

    gl.enableVertexAttribArray(positionAttrib);
    gl.enableVertexAttribArray(colorAttrib);

    gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 6*4, 0);
    gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 6*4, 3*4);

    // Буфер индексов
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    // Матрицы
    function createMatrix() {
      const matrix = new Float32Array(16);
      matrix[0] = matrix[5] = matrix[10] = matrix[15] = 1;
      return matrix;
    }

    const projectionMatrix = createMatrix();
    const modelViewMatrix = createMatrix();

    // Проекция
    function setProjection() {
      const fieldOfView = 45 * Math.PI / 180;
      const aspect = gl.canvas.width / gl.canvas.height;
      const zNear = 0.1;
      const zFar = 100.0;

      const f = 1.0 / Math.tan(fieldOfView / 2);
      projectionMatrix[0] = f / aspect;
      projectionMatrix[5] = f;
      projectionMatrix[10] = (zFar + zNear) / (zNear - zFar);
      projectionMatrix[11] = -1;
      projectionMatrix[14] = (2 * zFar * zNear) / (zNear - zFar);
      projectionMatrix[15] = 0;
    }

    // Вид (камера)
    function setView() {
      const eye = [0, 0, 6];
      const center = [0, 0, 0];
      const up = [0, 1, 0];

      const z = normalize(subtract(eye, center));
      const x = normalize(cross(up, z));
      const y = cross(z, x);

      modelViewMatrix[0] = x[0]; modelViewMatrix[1] = x[1]; modelViewMatrix[2] = x[2];
      modelViewMatrix[4] = y[0]; modelViewMatrix[5] = y[1]; modelViewMatrix[6] = y[2];
      modelViewMatrix[8] = z[0]; modelViewMatrix[9] = z[1]; modelViewMatrix[10] = z[2];
      modelViewMatrix[12] = -dot(x, eye);
      modelViewMatrix[13] = -dot(y, eye);
      modelViewMatrix[14] = -dot(z, eye);
    }

    // Вспомогательные функции
    function subtract(a, b) { return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
    function dot(a, b) { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]; }
    function cross(a, b) {
      return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
      ];
    }
    function normalize(v) {
      const len = Math.sqrt(dot(v, v));
      return len > 0 ? [v[0]/len, v[1]/len, v[2]/len] : v;
    }

    // Анимация
    let rotation = 0;
    function render(now) {
      rotation += 0.01;

      gl.clearColor(0.1, 0.4, 0.4, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);

      setProjection();
      setView();

      // Вращение куба
      const cos = Math.cos(rotation), sin = Math.sin(rotation);
      const rotY = new Float32Array([
        cos, 0, sin, 0,
        0, 1, 0, 0,
       -sin, 0, cos, 0,
        0, 0, 0, 1
      ]);
      const rotX = new Float32Array([
        1, 0, 0, 0,
        0, cos, -sin, 0,
        0, sin, cos, 0,
        0, 0, 0, 1
      ]);

      // Умножение матриц (rotY * rotX * modelView)
      const finalMatrix = multiply(rotY, multiply(rotX, modelViewMatrix));

      const projLoc = gl.getUniformLocation(program, "uProjectionMatrix");
      const mvLoc = gl.getUniformLocation(program, "uModelViewMatrix");
      gl.uniformMatrix4fv(projLoc, false, projectionMatrix);
      gl.uniformMatrix4fv(mvLoc, false, finalMatrix);

      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      requestAnimationFrame(render);
    }

    // Умножение 4x4 матриц
    function multiply(a, b) {
      const out = createMatrix();
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          out[i*4 + j] =
            a[i*4+0] * b[0*4+j] +
            a[i*4+1] * b[1*4+j] +
            a[i*4+2] * b[2*4+j] +
            a[i*4+3] * b[3*4+j];
        }
      }
      return out;
    }

    requestAnimationFrame(render);

