/*
1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.

2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.

3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
### Маленький (50 рублей, 20 калорий).
### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
### С сыром (+10 рублей, +20 калорий).
### С салатом (+20 рублей, +5 калорий).
### С картофелем (+15 рублей, +10 калорий). 
### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий). 

### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.
*/

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render(); //вывод товаров на страницу
        this.getSum();
    }
    _fetchProducts() {
        this.goods = [
            {id:1 ,title:'Notebook', price:2000},
            {id:2 ,title:'Mouse', price:20},
            {id:3 ,title:'Keyboard', price:200},
            {id:4 ,title:'Gamepad', price:50},
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }//Метод подсчитывающий суммарную стоимость всех товаров.
    getSum() {
        let summ = 0;
        this.goods.map(goods => summ += goods.price)
        console.log(summ);
    }

}
class ProductItem {
    constructor(product, img='http://placehold.it/200x100/'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item">
                    <img class="goods-img" src="${this.img}"/>
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="buy-button button" type="button">Купить</button>
                </div>`;
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
    //метод для быстрого сравнения товара с похожими товарами(другого цвета, комлпектации и тд)
    GetCompare(){

    };
    //метод для подсчета суммы в рамках одного товара. Например, если товара берется >1 шт.
    GetAmount(){

    };
}

//Метод для подсчета стоимости товаров




let list = new ProductList();
