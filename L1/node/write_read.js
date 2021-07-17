// JSON.stringify для преобразования объектов в JSON.
// JSON.parse для преобразования JSON обратно в объект.

//Пишем в файл
const fs = require('fs');
let users = [{name:'Ivan', id:10}];
//пишем в файл test.json, преобразованный в строку users. Если есть ошибки выводим.
fs.writeFile('test.json', JSON.stringify(users), err => {
    if(err){
        console.log(err);
    }
});


let user = '{"name":"Vasya", "id":10}';
//Считываем test.json с помощью UTF-8, если есть ошибки выводим.
fs.readFile('test.json', 'UTF-8', (err, data) =>{
    if (err) {
        console.log(err)
    } else { // если ошибок нет, пишем users считанные данные с 18 строки.
        let users = JSON.parse(data);
        //Пишем в users данные из user.
        users.push(JSON.parse(user));
        //Пишем в файл наш массив users, преобразованный в строку(писать можно только строки)
        fs.writeFile('test.json', JSON.stringify(users), err => {
            if(err) {
                console.log(err);
            }
        })
    }
}) 