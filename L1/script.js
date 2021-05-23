/*
1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.

2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.


*/



class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  rendertag() {
    return `<div class="goods-item"><img class="goods-img" src="http://placehold.it/200x100/"/><h3>${this.title}</h3><p>${this.price}</p> <button class="buy-button" type="button">Добавить в корзину</button></div>`;
  }

}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.rendertag();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

 //Метод через FOR, определяющий суммарную стоимость всех товаров.
  totalsum() {
      let sum = 0;
      for(let i = 0; i < this.goods.length; i++){
        sum += this.goods[i].price;
      }
      return sum;
    }

    
//Метод через .Map, определяющий суммарную стоимость всех товаров.
    totalsum_map() {
        let total_map = 0;
        this.goods.map(goods => total_map += goods.price);
        return total_map;
    }

//Метод через .Reduce, определяющий суммарную стоимость всех товаров.
    totalsum_reduce() {
        let total_reduce = this.goods.reduce((total, goods) => total + goods.price, 0);
        return total_reduce;
    }

}
//Класс-заготовка для корзины
class Bucket {
    //Метод для оформления заказа
    Checkout(){};
    //Метод для быстрой покупки без оформления и регистрации
    CheckoutQuick(){};
    //Метод подсчета общей суммы товаров в корзине
    GetTotalAmount(){};
}

//Класс-заготовка для элемента корзины
class BucketEl {
    //метод для быстрого изменения количества товара в корзине
    ChangeQuantity(){};
    //метод для удаления товара из корзины
    DeleteItem(){};
    //метод для быстрого сравнения товара с похожими товарами(другого цвета, комлпектации и тд)
    GetCompare(){};
    //метод для подсчета суммы в рамках одного товара, например, если товара берется неск. единиц
    GetAmount(){};
}


const list = new GoodsList();
list.fetchGoods();
list.render();

console.log(list.totalsum());
console.log(list.totalsum_map());
console.log(list.totalsum_reduce());

// 3. 
// Некая сеть фастфуда предлагает несколько видов гамбургеров:
// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий). 
// ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий). 
// ### 3 Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса из методички, но можно использовать и свою. 

