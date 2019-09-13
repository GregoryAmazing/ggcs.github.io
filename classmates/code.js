/* Для получения списка одноклассников из беседы ВК
var classmates = [];

for (let i = 2; i < 37; i++) {
    let newmate = document.querySelector(
        '#ChatSettings > section > div > div:nth-child(3) > div > div > ul > li:nth-child(' +
            i +
            ') > div.ListItem__main > div > div.Entity__main > div.Entity__title > a'
    ).innerText;
    classmates.push(newmate);
}
*/

var classmates = [
    'Ольга Трофимова',
    'Алёна Ткаченко',
    'Алсу Казакбаева',
    'Павел Улиткин',
    'Софья Кицова',
    'Катя Егорова',
    'Алиса Мануйлова',
    'Светлана Тарасенко',
    'Егор Апёнков',
    'Илья Пестряков',
    'Кирилл Гаврилов',
    'Егор Вишняков',
    'Алёна Фролова',
    'Юля Скоробулатова',
    'Ваня Вязов',
    'Данил Токарев',
    'Саша Ткачёв',
    'Юля Скоробулатова',
    'Василиса Худанова',
    'Влад Кленов',
    'Татьяна Алтухова',
    'Ваня Вязов',
    'Илья Болтачев',
    'Егор Гурко',
    'Вероника Очередько',
    'Василий Стрельбицкий'
];

var finallist = '';

function g() {
    // get student
    let mate = Math.floor(Math.random() * classmates.length);
    let matename = classmates[mate];
    classmates.splice(mate, 1);
    return matename;
}

function pair() {
    // get pair
    return ' ' + g() + ', ' + g();
}

finallist =
    `
3 этаж:` +
    pair() +
    `

4 этаж:` +
    pair() +
    `

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Лестница 1-2 этаж слева:` +
    pair() +
    `

Лестница 1-2 этаж cправа:` +
    pair() +
    `

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Лестница 2-3 этаж слева:` +
    pair() +
    `

Лестница 2-3 этаж cправа:` +
    pair() +
    `

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Лестница 3-4 этаж слева:` +
    pair() +
    `

Лестница 3-4 этаж cправа:` +
    pair() +
    `
`;

console.log(finallist);

document.querySelector('#list').innerText = finallist;

function copy() {
    document.querySelector('#copied').style.display = 'block';
    let copyText = document.querySelector('#clipboard');
    copyText.value = finallist;
    copyText.select();
    document.execCommand('copy');
}
