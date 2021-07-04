Vue.component('basket', {
    props:['basketproducts', 'img', 'visibility'],
    template: `<div class="cart-block" v-show="visibility">
                <slot></slot>
                <basket-item v-for="product of $parent.basketproducts" :key="product.id_product" :img="img" :basket-item="product">
                </basket-item>
               </div>`
});

Vue.component('basket-item', {
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
                        <button class="more-btn" @click=$root.addProduct(basketItem)>ADD</button>
                        <button class="less-btn" @click=$root.removeProduct(basketItem)>DEL</button>
                    </div>
                </div>`
})