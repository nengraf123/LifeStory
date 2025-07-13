var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    '',
    'void main()',
    '{',
    '  gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n');

var fragmentShaderText = [
    'precision mediump float;',
    '',
    'void main()',
    '{',
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
    '}'
].join('\n');

var InitDemo = function () {
    console.log("this is working");

    var canvas = document.getElementById('webGL');
    var gl = canvas.getContext('webgl');

    if (!gl) {
        alert('Твой браузер не поддерживает webgl');
        gl = canvas.getContext('experimental-webgl');
    };

    if (!gl) {
        alert('Твой браузер не поддерживает webgl');
    }

    gl.clearColor(0.32, 0.52, 1.0, 1.0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // очистка экрана

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('Ошибка при компиляции вершинного шейдера', gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('Ошибка при компиляции фрагментного шейдера', gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ошибка связывания программы', gl.getProgramInfoLog(program));
        return;
    };
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDDATE_STATUS)) {
        console.error('ОШИБКА программы GL', gl.getProgramInfoLog(program));
        return;
    };



    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // gl.viewport(0, 0, window.innerWidth, window.innerHeight);

};

// function vertexShader(vertPosition, vertColor) {
//     return {
//         fragColor: vertColor,
//         gl_Position: [vertPosition.x, vertPosition.y, 0.0, 1.0]
//     };
// };




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

