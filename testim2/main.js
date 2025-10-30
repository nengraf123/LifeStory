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
    if (!gl) {
      alert('Ваш браузер не поддерживает WebGL');
      throw new Error('WebGL не поддерживается');
    }

    // Устанавливаем размер canvas равным размеру окна
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Устанавливаем цвет очистки (синий) и очищаем экран
    gl.clearColor(0.1, 0.4, 0.4, 1.0); // RGBA: тёмно-синий
    gl.clear(gl.COLOR_BUFFER_BIT);


