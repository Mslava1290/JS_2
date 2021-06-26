const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor (url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.#init();
    }
    getJson(url){
        return fetch (url ? url: `${API + this.url}`)
            .then (result => result.Json())
            .catch(error => {
                console.log(error);
        })
    }
    handleData(data){
        this.goods = [...data];
        this.render();
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        console.log(this.constructor.name)
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            // мы сделали обьект товара либо cartItem либо ProductItem
            const productObj = new this.list[this.constructor.name](product)
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());    
        }
    }
    #init(){
        return false
    }
}

class Item {
    constructor(el, img = 'https://via.placeholder.com/200x150'){
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render(){//Генерация товаров для каталога товаров
        return `<div class="product-item" data-id = "${this.id_product}">
                    <img src="${this.img}" alt="Some image">
                    <div class="desc">
                        <h3>${this.product.name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn"
                        data-id="${this.id_product}
                        data-name="${this.product_name}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}

class ProductList extends List{
    constructor(cart, container = '.products', url = '/catalogData.json'){
        super(url, container)// вызываем конструктор базового класса. Отправляем в наш базовый конструктор наш URL и container
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));//Запускает отрисовку либо каталога товаров либо списка товаров корзины
    }
    #init(){
        document.querySelector(this.container).addEventListener('click', e =>{
            if(e.target.classList.contains('.buy-btn')){
                    this.cart.addProduct(e.target);
               }
        });
    }
}



class ProductItem extends Item{}
/*Цели конструтора каталога и корзины одна и таже:
Регистрация события по клику
Заполнить массив товаров из файлы JSON
Вывод данных на странице, используя метод handleData, который заполняет глобальный массив
товаров и выводит их на странице вызываю метод render*/
class Cart extends List {
    constructor(container = '.cart-block', url ='/getBasket.json'){
        super(url, container);
        this.getJson(url)
            .then(data => {
                this.handleData(data.contents)//  вывели товары в корзине
            });
    }
    addProduct(element){
       
        
    }



















    #init(){
        document.querySelector('.btn-cart').addEventListener('click',()=>{
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e =>{
            if(e.target.classList.contains('.del-btn')){
                this.removeProduct(e.target);
            }
        })
    }



}























class CartItem extends Item {
    constructor (el, img = 'https://via.placeholder.com/50x100'){
        super(el, img);
        this.quantity = quantity;
    }

    render (){
        return `<div class="cart-item" data-id = "${this.id_product}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product.name}</p>
                            <p class="product-quantity">${this.product.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$${this.price * this.quantity}</p>
                        <button class="del-btn" data-id="${this.id_product}">SIMBOL</button>
                    </div>
                </div>`
    }
}

const list2 = {
    ProductList: ProductItem,
    Cart: CartItem
};


// class A{
//     f(b){
//         b.g()
//     }
// }
// class B{
//     g(){}
// }
// let a = new A()
// A.f(b)



let cart = new Cart();
let products = new ProductList(cart);
