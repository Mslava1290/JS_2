const product = {
    props:['product', 'img'],
    template: `<div class="product-item">
                    <img :src="img" alt="Some Img">
                    <div class="desc">
                        <h3>{{ product.product_name }}</h3>
                        <p>{{ product.price }}</p>
                        <button class="buy-btn" @click=$root.$refs.basket.addProduct(product)>Купить</button>
                    </div>                    
                </div>`
}

const products = {
    components: {product},
    data() {
        return {
            catalogUrl:'/catalogData.json',
            products: [],
            imgCatalog: 'https://via.placeholder.com/150x100',
            filtered: []
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el)
                    this.filtered.push(el)
                }
            });
        this.$parent.getJson('getProducts.json')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                } 
            })
    },
    methods: {
        filter(val) {
            const regexp = new RegExp(val, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name))
        }
    },
    template: `
                <div class="products">
                    <product 
                    v-for="item of filtered"
                    :key="item.id_product"
                    :img="imgCatalog"
                    :product="item">
                    </product>
              </div>
              `
};
