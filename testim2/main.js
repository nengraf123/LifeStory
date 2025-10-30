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
    gl.clearColor(0.0, 0.5, 1.0, 1.0); // RGBA: тёмно-синий
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Здесь будет твой будущий код: шейдеры, буферы, рисование...
    console.log('WebGL инициализирован! Готов к работе.');

