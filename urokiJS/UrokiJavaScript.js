var name0 = 'graf'; // старый формат
let name1 = 'graf'; // новый формат
const name2 = 'graf'; // неизменяеммая  переменная

// = - присвоение
// == - не строгое сравнение
// === - строгое сравнение

console.log(10 > 99); 


let test0 = 9;
if (test0 == 11) {console.log('test0 has 11')}
else if (test0 < 11) {console.log('test0 less that 11')}
else {console.log('test0 more that 11')}


let test1 = 20;
test1 == 20 ? 'test1 === 20' : console.log('test1 != 20');


// function decLaration
// function expression
// между ними нету особой разницы просто декларатион можно обьявить выше самой функции а експетион нет

// function decLaration
let test2 = true;
function sayIdiNahoi()
{
    if (test2 === true) {console.log("sam_idi_nahoi")}
};
sayIdiNahoi();

// function expression
let test3 = function () 
{
    console.log("pizda")
    alert('hui');
};
// test3();


function parametriInFunction (name, SVO, sum0)
{
    console.log(`Hello, ${name}!, слава ${SVO}\n${sum0}`); // при засовывании переменных обязательно `` вместо '' или ""
    // return sum0; // возвращяем результат
    return SVO;
};

let test4 = 'egor alkash';
let sum1 = parametriInFunction(test4, 'СВО', 2+2);
console.log('summa ==', sum1);


// Массивы
const karty = ['shut', 'tuz', 'korol', 'dama', 'valet', [10, '9', '8', '7', '6'], true, ];
console.log(karty);
console.log(karty[5]);
console.log(karty.length);
// еще есть методы масива
karty.push(false); // добавили в конец массива false
karty.pop(); // удалили из масива последний элемент
karty.unshift('seriyShut'); // добавили в начало массива элемент
karty.shift(); // удалили из начало массива элемент
console.log(karty);


// циклы
console.log('\n\nНачало цикла:');
for (let i=0; i <= 2; i++)
{
    console.log(i);
};
console.log('Конец цикла:\n\n\n');

// обход массива циклом for с названием for(of)(больше используемая тема среди js прогеров как сказалим на ютубе)
// я посмотрел и могу сказать с увереностью что выглядит как хуета ТЧ не буду записывать пока что( все же записал)
console.log('// обход массива циклом for с названием for(of)(больше используемая тема среди js прогеров как сказалим на ютубе)');
const cikl_0 = [1, 2, 3, 4, 5]
for (let item0 of cikl_0)
{
    console.log(item0);
}

// обход массива циклом  forEach();
console.log('\n\n// обход массива циклом  foreach();');
cikl_0.forEach(function (item1, index0) {
    console.log(`${item1} == ${index0}`);
})
console.log('тоже хуйня по моему\n\n\n');
console.log('hui' - 'pizda');


// обьекты
const player = {
    userName: 'Игрок',
    age: 14,
    dmg: 10,
    adult: false,
    profession: 'dalboeb'
};
console.log(player);
console.log(player.userName);
console.log(player['age']);
let ajskddhfk = 'dalboeb'
console.log(player['profession']);
delete player.adult; // удаляем свойство обьекта
console.log(player,"\n\n\n\n");

// методы в обьектах && ключевое слово this

console.log(`\n\n`);

let egor = {
    age: 16,
    adult: false,
    pirivet: function(name3) {
        console.log(this);
        console.log(`hail gitler, ${name3}, сколько тебе лет, мне вот ${this.age}\n\n\n`);
    }
};
egor.pirivet('huesos');

// обьекты, обход циклом for(in), не путать с fot(of)
for (let key in egor) {
    console.log(key, `:`, egor[key]);
};


// классы. Конструкторы обьектов
class Person {
    constructor(userName_, age_, adult_) {
        this.userName_ = userName_;
        this.age_ = age_;
        this.adult_ = adult_;
    };
};

const person1 = new Person('vlad', 16, false);
const person2 = new Person('pavel', 19, true);
console.log(person1, person2);
console.log(`\n\n\n\n`, person2.age_, `\n\n`);


// выбор DOM элементов (как я понял парсинг сайта)
console.log(document.querySelector('div')); // найти элемент
console.log(document.querySelector('.dom-example')); // найти элемент по классу
console.log(document.querySelector('#ss')); // найти элемент по id

document.querySelector('h2').classList.add('red'); // присваеваем элементу класс 
console.log(document.querySelector('h2'));

let test5 = document.querySelectorAll('h2') // выбор всех элементов с таким наванием ему мы уже не можем приисвоить класс напрямую так что делаем это через for(of) который ниже 
console.log(test5);
for (item2 of test5) {
    item2.classList.add('green-text')
}


// работа с css
const test6 = document.querySelector('h2');
test6.classList.remove('red'); // убрали класс у первого заголовка

const test7 = document.querySelector('.z2');
test7.classList.add('red'); // добавили класс к 2 заголовку

const test8 = document.querySelector('#z3');
test8.classList.toggle('green-text'); // добавляет класс или уберает в зависимости от того есть ли он или нет (удобная штукенция)

const test9 = document.querySelector('h2');
let result = test9.classList.contains('green-text'); // проверка есть ли у заголовка данный класс
console.log('\n\n\n', result);

if (result) // проверка на есть ли в h2 класс green-text
{
   console.log('hui'); 
} else {
    console.log('cleeen');
}

if (test9.classList.contains('green')) // проверка на есть ли в h2 класс green-text
{
   console.log('hui'); 
} else {
    console.log('cleeen');
}
console.log('\n\n\n')


// работа с атрибутами

const img1 = document.querySelector('#logo')
let info0 = img1.getAttribute('src') // считываем атребут
console.log(info0)

img1.setAttribute('src', './../img/i4.jpg') // 1 это что хотим измменить, 2 это что мы хотим записать в этот атребут
img1.setAttribute('width', '400') // изменяем размер картинки
img1.setAttribute('height', '400') // изменяем размер картинки
img1.width = '550' // еще можем так изменить 
console.log(img1.width)
img1.removeAttribute('height') // удаляем атрибут
