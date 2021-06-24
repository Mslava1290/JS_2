/**
1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
a. Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке. 


 */
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.#fetchProducts()
            .then(data => {
                this.goods = [...data];
                this.#render(); //вывод товаров на страницу
            })
        // this.getSum();
    }
    #fetchProducts(){
        return fetch(`${API}/catalogData.json`)
            // .then (result => result.json()) // полученный json привели в обьект
            .then (result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    #render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }

    //Метод подсчитывающий суммарную стоимость всех товаров.
    getSum() {
        let summ = 0;
        this.goods.map(goods => summ += goods.price)
        console.log(summ);
    }

}

class BasketList {
    constructor(basket = '.basketItems', total = '.total') {
        this.basket = basket;
        this.total = total;
        this.goodsOfBasket = [];
        this.#fetchProductsForBasket()
        .then(data => {
                this.goodsOfBasket = [...data.contents];
                this.goodsOfBasket.amount = data.amount;
                this.goodsOfBasket.countGoods = data.countGoods;
                console.log(this.goodsOfBasket)
                this.#renderForBasket(); //вывод товаров в раздел корзина
            })
    }

     #fetchProductsForBasket(){
         return fetch(`${API}/getBasket.json`)
            .then(result => result.json()) // полученный json привели в обьект
            .catch(error => {
                console.log(error);
            })
    }
    #renderForBasket() {
        const block = document.querySelector(this.basket);
        const total = document.querySelector(this.total);
        this.goodsOfBasket.forEach((el,index) => {// Использовал forEach, что бы пробросить индексы в корзину
            const item = new ProductItem(el);
            block.insertAdjacentHTML('beforeend', item.renderItemsBasket(index));
        })
        // for (let product of this.goodsOfBasket) {
        //     const item = new ProductItem(product);
        //     block.insertAdjacentHTML('afterbegin', item.renderItemsBasket());
        // }
        total.insertAdjacentHTML('beforeend', `Товаров: ${this.goodsOfBasket.countGoods}. <br> На сумму: ${this.goodsOfBasket.amount} руб.`);
    }
}

class ProductItem {
    constructor(product, img='http://placehold.it/200x100/'){
        this.title = product.product_name;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
        // this.quantity = quantity; // Подскажите как пробросить кол-во с файлика? 
        //Делать отдельный класс, который будет содержать quantity ?
    }

    render() {
        return `<div class="goods-item">
                    <img class="goods-img" src="${this.img}"/>
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="buy-button button" type="button">Купить</button>
                </div>`;
    }
   
    renderItemsBasket(index) {  //Пробросил индексы.
        return `<div class="basketstring"> 
        ${index+1}. 
        ${this.title} | 
        ${this.price} руб.</div> 
        <hr>`;
    }
}


//Класс-заготовка для корзины
class Bucket {
    //Метод для оформления заказа
    Checkout(title, price){
        this.title = title;
        this.price = price;
    };
    //Метод для быстрой покупки без регистрации
    CheckoutQuick(title, price){
        this.title = title;
        this.price = price;
    };
}

//Класс-заготовка для элемента корзины
class BucketEl {
    //метод для быстрого изменения количества товара в корзине. Например "+" "-" напротив товара
    ChangeQuantity(){

    };
    //метод для удаления товара из корзины
    DeleteItem(){

    };
    //метод для подсчета суммы в рамках одного товара. Например, если товара берется >1 шт.
    GetAmount(){

    };
}

//Метод для подсчета стоимости товаров


let list = new ProductList();
let basketlist = new BasketList();
let basketClick = document.querySelector('basket');