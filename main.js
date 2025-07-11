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


function parametriInFunction (name, SVO)
{
    console.log(`Hello, ${name}!, слава ${SVO}`); // при засовывании переменных обязательно `` вместо '' или ""
};

let test4 = 'egor alkash';
parametriInFunction(test4, 'СВО');

