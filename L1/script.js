const goods = [{
        title: 'Shirt',
        price: 150
    },
    {
        title: 'Socks',
        price: 50
    },
    {
        title: 'Jacket',
        price: 350
    },
    {
        title: 'Shoes',
        price: 250
    },
];

const renderGoodsItem = (title = 'null', price = '0') => {
    let img = '<img src="http://placehold.it/150x100/"/>';
    let buybutton = '<button class="buy-button" type="button">Купить</button>';

    return `<div class="goods-item">${img}<h3>${title}</h3><p>${price}</p> ${buybutton}</div>`;
};


const renderGoodsList = (list = []) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}
renderGoodsList(goods);