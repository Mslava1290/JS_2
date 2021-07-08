const cartItem = {
    props: ['cart_item', 'img'],
    template:   `<div class="cart-item">
                    <div>
                        <img :src="img" alt="Some Img">
                    </div>
                    <div class="desc-of-bskt">
                        <h3>{{ cart_item.product_name }}</h3>
                        <p>Цена: {{ cart_item.price }} руб.</p>
                        <p>Количество: {{ cart_item.quantity }}</p>
                        <p>Сумма: {{ cart_item.total }} руб.</p>
                    </div>
                    <div class="btn-quantity">
                        <button class="more-btn" @click=$parent.addProduct(cart_item)>ADD</button>
                        <button class="less-btn" @click=$parent.removeProduct(cart_item)>DEL</button>
                    </div>
                </div>
                `
}

const cart = {
    components: {'cart-item': cartItem},
    data() {
        return {
            cartUrl:'/getBasket.json',
            imgCart: 'https://via.placeholder.com/75x75',
            showCart: false,
            cartItems:[],
        }
    },
    methods: {
        //Проверяем есть ли добавляемый обьект в корзине. Если есть, то меняет кол-во, если нет -- то создаем.
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(item => item.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                            this.TotalSum(find);
                        } else {
                                //создаем новый обьект путем слияния нового обьекта с 1 св-вом и product, и пушим.
                                this.cartItems.push(Object.assign({quantity:1}, product));
                            }
                    }else {
                        console.log('ошибка доступа к серверу')
                    }
                })
        },
        //Ищем обьект. Если есть, и кол-во >1, то меняем кол-во. Если меньше, то удаляем из массива.
        removeProduct(product) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if(product.quantity > 1){
                            product.quantity--;
                            this.TotalSum(product);
                        }else {
                           this.cartItems.splice(this.cartItems.indexOf(product),1);
                           this.TotalSum(product);
                        }
                    }
                })
        },
        //Подсчет общей суммы за 1 товар.
        TotalSum(product) {
            product.total = product.price*product.quantity;
            }
    },
    mounted () {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el)
                }
            })
    },
    template: `<div>
                    <button class="btn-cart" type="button" @click ="showCart=!showCart">Корзина</button>
                    <div class="cart-block" v-show="showCart">
                        <slot></slot>
                        <cart-item v-for="product of cartItems" 
                            :key="product.id_product" 
                            :img="imgCart" 
                            :cart_item="product"></cart-item>
                    </div>
                </div>`
};
