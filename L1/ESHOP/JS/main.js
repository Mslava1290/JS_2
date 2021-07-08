// 1. Привязать добавление товара в корзину к реальному API.
// 2. Добавить API для удаления товара из корзины.
// 3. *Добавить файл stats.json, в котором будет храниться статистика действий пользователя с корзиной. В файле должны быть поля с названием действия (добавлено/удалено), названием товара, с которым производилось действие и временем, когда оно было совершено.

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        showCart: false,
        catalogUrl:'/catalogData.json',
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/150x100',
        products: [],
        errorstatus: false,
        errormessage: '',
    },
    components:{cart, products, filter_el},
    
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error =>{
                    this.errorstatus = true;
                    this.errormessage = error;
                })
        }
    }
});