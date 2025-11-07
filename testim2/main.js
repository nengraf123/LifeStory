// // Стили для <html>
//     const html = document.documentElement;
//     html.style.margin = '0';
//     html.style.padding = '0';
//     html.style.width = '100%';
//     html.style.height = '100%';
//     html.style.overflow = 'hidden';

// // Стили для <body>
//     const body = document.body;
//     body.style.margin = '0';
//     body.style.padding = '0';
//     body.style.width = '100%';
//     body.style.height = '100%';
//     body.style.overflow = 'hidden';





// document.body.innerHTML += `
//     <div><br>Привет!</div>
// `;


const canvas = document.getElementById('glCanvas');                                // получаем canvas по id
const gl = canvas.getContext('webgl');                                             // получаем WebGL контекст (WebGL1)
if (!gl) { console.error('WebGL не поддерживается'); throw new Error('no-webgl'); } // если нет — пишем в консоль и прекращаем

// подгонка размера канваса под devicePixelRatio для чёткости
function resizeCanvasToDisplaySize() {                                              // функция для ресайза
  const dpr = window.devicePixelRatio || 1;                                        // device pixel ratio
  const w = Math.floor(canvas.clientWidth * dpr);                                  // вычисляем ширину
  const h = Math.floor(canvas.clientHeight * dpr);                                 // вычисляем высоту
  if (canvas.width !== w || canvas.height !== h) {                                 // если отличается
    canvas.width = w; canvas.height = h;                                           // устанавливаем реальные размеры
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);              // обновляем viewport
  }
}

// шейдеры (вершинный и фрагментный)
const vsSource = `attribute vec3 aPos; attribute vec3 aColor; uniform mat4 uMVP; varying vec3 vColor; void main(){ vColor = aColor; gl_Position = uMVP * vec4(aPos, 1.0); }`; // верш шейдер
const fsSource = `precision mediump float; varying vec3 vColor; void main(){ gl_FragColor = vec4(vColor, 1.0); }`; // фраг шейдер

function compileShader(src, type){                                                  // компиляция шейдера
  const sh = gl.createShader(type);                                                // создаём шейдер
  gl.shaderSource(sh, src);                                                        // задаём источник
  gl.compileShader(sh);                                                            // компилируем
  if(!gl.getShaderParameter(sh, gl.COMPILE_STATUS)){                               // проверяем статус
    console.error('Shader compile error:', gl.getShaderInfoLog(sh));               // лог ошибки
    gl.deleteShader(sh); return null;                                              // удаляем и возвращаем null
  }
  return sh;                                                                       // возвращаем шейдер
}

function createProgram(vsSrc, fsSrc){                                              // создаём программу шейдеров
  const vs = compileShader(vsSrc, gl.VERTEX_SHADER);                               // компилируем верш
  const fs = compileShader(fsSrc, gl.FRAGMENT_SHADER);                             // компилируем фраг
  if(!vs || !fs) throw new Error('shader-compile-failed');                         // если не получилось — ошибка
  const prog = gl.createProgram();                                                 // создаём программу
  gl.attachShader(prog, vs); gl.attachShader(prog, fs);                            // прикрепляем шейдеры
  gl.linkProgram(prog);                                                            // линкуем
  if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){                              // проверяем линковку
    console.error('Program link error:', gl.getProgramInfoLog(prog));              // лог ошибки
    gl.deleteProgram(prog); throw new Error('program-link-failed');                // бросаем
  }
  return prog;                                                                     // возвращаем программу
}

const program = createProgram(vsSource, fsSource);                                 // создаём программу
gl.useProgram(program);                                                             // используем программу

// данные куба: 8 вершин и индексы для 12 треугольников
const positions = new Float32Array([                                               // 8 вершин (x,y,z)
 -1,-1,-1,  1,-1,-1,  1,1,-1, -1,1,-1,
 -1,-1, 1,  1,-1, 1,  1,1, 1, -1,1, 1,
]);
const colors = new Float32Array([                                                  // цвет для каждой вершины (r,g,b)
 1,0,0,  0,1,0,  0,0,1,  1,1,0,
 1,0,1,  0,1,1,  0.6,0.6,0.6,  0.2,0.2,0.2,
]);
const indices = new Uint16Array([                                                  // индексы для drawElements
 0,1,2, 0,2,3,
 4,5,6, 4,6,7,
 3,2,6, 3,6,7,
 0,1,5, 0,5,4,
 1,2,6, 1,6,5,
 0,3,7, 0,7,4,
]);

// создаём и заполняем буферы
const posBuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, posBuf); gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW); // позиции
const colBuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, colBuf); gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);       // цвета
const idxBuf = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW); // индексы

// связывание атрибутов
const aPosLoc = gl.getAttribLocation(program, 'aPos');                            // локация атрибута позиции
gl.bindBuffer(gl.ARRAY_BUFFER, posBuf); gl.enableVertexAttribArray(aPosLoc); gl.vertexAttribPointer(aPosLoc, 3, gl.FLOAT, false, 0, 0); // настройка
const aColorLoc = gl.getAttribLocation(program, 'aColor');                        // локация атрибута цвета
gl.bindBuffer(gl.ARRAY_BUFFER, colBuf); gl.enableVertexAttribArray(aColorLoc); gl.vertexAttribPointer(aColorLoc, 3, gl.FLOAT, false, 0, 0); // настройка

const uMVPLoc = gl.getUniformLocation(program, 'uMVP');                           // локация uniform матрицы

gl.enable(gl.DEPTH_TEST);                                                          // включаем тест глубины
gl.clearColor(0.95, 0.95, 0.95, 1);                                                // цвет очистки

// небольшие функции матриц (очень простые, достаточно для примера)
function mat4Identity(){ return [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]; }             // единичная матрица
function mat4Multiply(a,b){                                                         // умножение матриц 4x4
  const r = new Array(16);
  for(let i=0;i<4;i++){ for(let j=0;j<4;j++){ let s=0; for(let k=0;k<4;k++){ s += a[i*4+k]*b[k*4+j]; } r[i*4+j]=s; } }
  return r;
}
function mat4Perspective(fovy, aspect, near, far){                                 // простая перспектива
  const f = 1.0 / Math.tan(fovy/2); const nf = 1/(near - far);
  return [f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)*nf,-1, 0,0,(2*far*near)*nf,0];
}
function mat4Translate(m,x,y,z){ const t = mat4Identity(); t[12]=x; t[13]=y; t[14]=z; return mat4Multiply(m,t); } // перенос
function mat4RotateX(m,ang){ const c=Math.cos(ang), s=Math.sin(ang); const r=[1,0,0,0, 0,c,-s,0, 0,s,c,0, 0,0,0,1]; return mat4Multiply(m,r); } // поворот X
function mat4RotateY(m,ang){ const c=Math.cos(ang), s=Math.sin(ang); const r=[c,0,s,0, 0,1,0,0, -s,0,c,0, 0,0,0,1]; return mat4Multiply(m,r); } // поворот Y

let angle = 0;                                                                      // угол для анимации

function draw(){                                                                    // функция рисования кадра
  resizeCanvasToDisplaySize();                                                      // корректируем размеры
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);                              // очищаем буферы

  const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;                    // соотношение сторон
  const proj = mat4Perspective(Math.PI/4, aspect, 0.1, 100);                        // матрица проекции
  let model = mat4Identity(); model = mat4Translate(model, 0, 0, -6);               // модель: смещение назад
  model = mat4RotateX(model, angle * 0.6); model = mat4RotateY(model, angle);       // вращение
  const mvp = mat4Multiply(proj, model);                                            // MVP = proj * model
  gl.uniformMatrix4fv(uMVPLoc, false, new Float32Array(mvp));                       // передаём матрицу в шейдер

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);                                   // привязываем индексный буфер
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);              // рисуем элементы

  angle += 0.02;                                                                    // увеличиваем угол
  requestAnimationFrame(draw);                                                      // следующий кадр
}

requestAnimationFrame(draw);                                                        // стартуем анимацию

