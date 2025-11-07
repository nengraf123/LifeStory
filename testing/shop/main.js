const products = [
  { img: "https://i.pinimg.com/736x/2d/e3/6d/2de36d2fc91eb676a2fa453912a41b3a.jpg", title: "Котик", url: "./../../webGL/index.html" },
  { img: "https://cs10.pikabu.ru/post_img/2019/03/27/6/1553676211191081899.png", title: "компьютер эпл<br>$2000", url: "#" },
  { img: "https://danielonline.ru/upload/resize_cache/iblock/125/400_400_0/imqhydp36ocwla6o3c452h1ig71vah5k.jpg", title: "пылесос <br>$∞", url: "#" },
  { img: "https://obninsk.name/UserFiles/Image/202205/2022-05-21-11-06-491.jpg", title: "тупая дура гы гы гы <br>$2", url: "#" },
  // добавляйте сколько угодно
];

const container = document.getElementById('shopCarts');

products.forEach(item => {
  const card = document.createElement('a');
  card.className = 'card';
  card.href = item.url;
  card.innerHTML = `
    <img src="${item.img}" alt="${item.title}">
    <div class="title">${item.title}</div>
  `;
  container.appendChild(card);
});
