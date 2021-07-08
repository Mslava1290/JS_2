const basketItem = {
    props: ['img', 'basketItem'],
    template:   `<div class="cart-item">
                    <div>
                        <img :src="img" alt="Some Img">
                    </div>
                    <div class="desc-of-bskt">
                        <h3>{{ basketItem.product_name }}</h3>
                        <p>Цена: {{ basketItem.price }} руб.</p>
                        <p>Количество: {{ basketItem.quantity }}</p>
                        <p>Сумма: {{ basketItem.total }} руб.</p>
                    </div>
                    <div class="btn-quantity">
                        <button class="more-btn" @click=$root.$refs.basket.addProduct(basketItem)>ADD</button>
                        <button class="less-btn" @click=$root.$refs.basket.removeProduct(basketItem)>DEL</button>
                    </div>
                </div>
                `
}

const basket = {
    components: {'basket-item': basketItem},
    data() {
        return {
            cartUrl:'/getBasket.json',
            imgBasket: 'https://via.placeholder.com/75x75',
            showCart: false,
            basketproducts:[],
        }
    },
    methods: {
        //Проверяем есть ли добавляемый обьект в корзине. Если есть, то меняет кол-во, если нет -- то создаем.
        addProduct(product) {
            this.$parent.getJson(`${API + this.cartUrl}`)
                .then(data => {
                    // for(let el of data.contents){
                    // this.basketproducts.push(el)
                // }
                if(data.result) {
                    let find = this.basketproducts.find(item => item.id_product === product.id_product);
                    if (find) {
                        find.quantity++;
                        this.TotalSum(find);
                    } else {
                            //создаем новый обьект путем слияния нового обьекта с 1 св-вом и product, и пушим.
                            this.basketproducts.push(Object.assign({quantity:1}, product));
                        } 
                } else {
                    console.log('ошибка доступа к серверу')
                }
                })
        },
        //Ищем обьект. Если есть, и кол-во >1, то меняем кол-во. Если меньше, то удаляем из массива.
        removeProduct(product) {
            let productId = product.id_product;
            let find = this.basketproducts.find(product => product.id_product === productId);
            if (find) {
                if(find.quantity > 1){
                    find.quantity--;
                    this.TotalSum(product);
                }else {
                   this.basketproducts.splice(this.basketproducts.indexOf(find),1);
                    this.TotalSum(product);
                }
            }
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
                    this.basketproducts.push(el)
                }
            })
    },
    template: `  <div class="cart-block" v-show="visibility">
                    <slot></slot>
                    <basket-item v-for="product of $parent.basketproducts" :key="product.id_product" :img="img" :basketItem="product">
                    </basket-item>
                </div>
                `
};
