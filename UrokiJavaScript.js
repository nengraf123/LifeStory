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
        console.log(`hail gitler, ${name3}, сколько тебе лет, мне вот ${this.age}`);
    }
};
egor.pirivet('huesos');

// обьекты, обход циклом for(in), не путать с fot(of)
