//1. Вынести поиск в отдельный компонент.
//2. Вынести корзину в отдельный компонент. Можно оставить вариант из урока
//3. *Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl:'/catalogData.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/150x100',
        imgBasket: 'https://via.placeholder.com/75x75',
        userSearch: '',
        show: false,
        filtered: [],
        basketproducts:[],
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error =>{
                    console.log(error);
            })
        },//Проверяем есть ли добавляемый обьект в корзине. Если есть, то меняет кол-во, если нет -- то создаем.
        addProduct(product) {
            let productId = product.id_product;
            let find = this.basketproducts.find(product => product.id_product === productId);
            if (find) {
                find.quantity++;
            } else {
                        let newproduct = {
                            id_product: productId,
                            price: product.price,
                            product_name: product.product_name,
                            quantity:1,
                        };
                    this.basketproducts.push(newproduct);
            }        

        },//Ищем обьект. Если есть, и кол-во >1, то меняем кол-во. Если меньше, то удаляем из массива.
        removeProduct(product) {
            let productId = product.id_product;
            let find = this.basketproducts.find(product => product.id_product === productId);
            if (find) {
                if(find.quantity > 1){
                    find.quantity--;
                }else {
                   this.basketproducts.splice(this.basketproducts.indexOf(find),1);
                }
            }
        },
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name))
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
            for(let el of data){
                this.products.push(el);
                this.filtered.push(el);
            }
        })
        this.getJson('getProducts.json')
            .then(data => {
            for(let el of data){
                this.products.push(el);
                this.filtered.push(el);
            }
        })
    }
})


// class List {
//     constructor (url, container, list = list2) {
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }
//     getJson(url){
//         return fetch (url ? url : `${API + this.url}`)
//             .then (result => result.json())
//             .catch(error => {
//                 console.log(error);
//         })
//     }
//     handleData(data){
//         this.goods = [...data];
//         this.render();
//     }
//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//     render(){
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const productObj = new this.list[this.constructor.name](product) // мы сделали обьект товара либо cartItem либо ProductItem
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());    
//         }
//         console.log(this.allProducts)

//     }
//     filter(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)) {
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible')
//             }
//         })
//     }


//     _init(){
//         return false
//     }
// }

// class Item {
//     constructor(el, img = 'https://via.placeholder.com/200x150'){
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.id_product = el.id_product;
//         this.img = img;
//     }
//     render(){//Генерация товаров для каталога товаров
//         return `<div class="product-item" data-id = "${this.id_product}">
//                     <img src="${this.img}" alt="Some image">
//                     <div class="desc">
//                         <h3>${this.product_name}</h3>
//                         <p>${this.price} $</p>
//                         <button class="buy-btn"
//                         data-id="${this.id_product}"
//                         data-name="${this.product_name}"
//                         data-price="${this.price}">Купить</button>
//                     </div>
//                 </div>`
//     }
// }

// class ProductList extends List{
//     constructor(cart, container = '.products', url = '/catalogData.json'){
//         super(url, container)// вызываем конструктор базового класса. Отправляем в наш базовый конструктор наш URL и container
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));//Запускает отрисовку либо каталога товаров либо списка товаров корзины
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e =>{
//             if(e.target.classList.contains('buy-btn')){
//                 this.cart.addProduct(e.target);
//                }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value);
//         })
    
    
    
    
//     }
// }


// class ProductItem extends Item{}
// /*Цели конструтора каталога и корзины одна и таже:
// Регистрация события по клику
// Заполнить массив товаров из файлы JSON
// Вывод данных на странице, используя метод handleData, который заполняет глобальный массив
// товаров и выводит их на странице вызываю метод render*/
// class Cart extends List {
//     constructor(container = '.cart-block', url ='/getBasket.json'){
//         super(url, container);
//         this.getJson(url)
//             .then(data => {
//                 this.handleData(data.contents)//  вывели товары в корзине
//             });
//     }
//     addProduct(element){
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if(data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     console.log(productId)
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     console.log(find);
//                     if (find) {
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else {
//                         let product = {
//                             id_product : productId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             quantity: 1
//                         };
//                         this.goods = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert('Error_add');
//                 }
//             })
//     }
//     removeProduct(element){
//             this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if(data.result === 1) {
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if(find.quantity >1) {
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find),1);
//                         document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error_del');
//                 }
//             })
//     }
//     _updateCart(product){
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
//         block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
//     }
//     _init(){
//         document.querySelector('.btn-cart').addEventListener('click',()=>{
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//         document.querySelector(this.container).addEventListener('click', e =>{
//             if(e.target.classList.contains('del-btn')){
//                 this.removeProduct(e.target);
//             }
//         })
//     }

// }

// class CartItem extends Item {
//     constructor (el, img = 'https://via.placeholder.com/50x100'){
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render (){
//         return `<div class="cart-item" data-id = "${this.id_product}">
//                     <div class="product-bio">
//                         <img src="${this.img}" alt="Some image">
//                         <div class="product-desc">
//                             <p class="product-title">${this.product_name}</p>
//                             <p class="product-quantity">Quantity:${this.quantity}</p>
//                             <p class="product-single-price">$${this.price}</p>
//                         </div>
//                     </div>
//                     <div class="right-block">
//                         <p class="product-price">$${this.price * this.quantity}</p>
//                         <button class="del-btn" data-id="${this.id_product}">Удалить</button>
//                     </div>
//                 </div>`
//     }
// }
// const list2 = {
//     ProductList: ProductItem,
//     Cart: CartItem
// };


// // class A{
// //     f(b){
// //         b.g()
// //     }
// // }
// // class B{
// //     g(){}
// // }
// // let a = new A()
// // A.f(b)



// let cart = new Cart();
// let products = new ProductList(cart);
