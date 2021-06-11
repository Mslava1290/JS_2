const goods = [{
        id: 1,
        title: 'Notebook',
        price: 2000
    },
    {
        id: 2,
        title: 'Mouse',
        price: 20
    },
    {
        id: 3,
        title: 'Keyboard',
        price: 200
    },
    {
        id: 4,
        title: 'Gamepad',
        price: 50
    },
];

const renderGoodsItem = x => {
    let img = '<img src="http://placehold.it/150x100/"/>';
    let buybutton = '<button class="buy-button" type="button">Купить</button>';

    return `<div class="goods-item">
                ${img}
                <h3>${x.title}</h3>
                <p>${x.price}</p>
                ${buybutton}
            </div>`;
};


const renderGoodsList = (list = []) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    console.log(goodsList);
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}
renderGoodsList(goods);