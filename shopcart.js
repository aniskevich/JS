var sum = 0;
var $container = document.getElementById('shoppingCart');
var shopCart = [];
var productInCart1 = {
    amount: 4,
    productDescription: {
        type: 'Sport',
        name: 'T-Shirt',
        brand: 'Adidas',
        size: 'L',
        color: 'white',
        cost: 500,
    },
    productInCartSum: function () {
        return this.amount * this.productDescription.cost;
    },
};
var productInCart2 = {
    amount: 2,
    productDescription: {
        type: 'Sport',
        name: 'Trousers',
        brand: 'Adidas',
        size: 'M',
        color: 'black',
        cost: 2500,
    },
    productInCartSum: function () {
        return this.amount * this.productDescription.cost;
    },
};
var productInCart3 = {
    amount: 1,
    productDescription: {
        type: 'Sport',
        name: 'Sneakers',
        brand: 'Adidas',
        size: '43',
        color: 'black',
        cost: 8000,
    },
    productInCartSum: function () {
        return this.amount * this.productDescription.cost;
    },
};
var productInCart4 = {
    amount: 10,
    productDescription: {
        type: 'Sport',
        name: 'Socks',
        brand: 'noname',
        size: '40-44',
        color: 'black',
        cost: 50,
    },
    productInCartSum: function () {
        return this.amount * this.productDescription.cost;
    },
}

var productLayout = [
    productInCart1,
    productInCart2,
    productInCart3,
    productInCart4,
]

function totalCartCost() {
    for (var i = 0; i < shopCart.length; i++) {
        sum += shopCart[i].productInCartSum();
    }
    return sum;
}
function cartGeneration() {
    $container.innerHTML = '';
    sum = 0;
    for (var i = 0; i < shopCart.length; i++) {
        var $row = document.createElement('div');
        $container.append($row); 
        $row.classList.add('row');
        for (var j = 0; j < 8; j++) {
            var $cell = document.createElement('div');
            $row.append($cell);
            $cell.classList.add('cell');
            if (j < 6) {
                $cell.textContent = shopCart[i].productDescription[Object.keys(shopCart[i].productDescription)[j]];
            }
            else if (j == 6) {
                $cell.textContent = shopCart[i].amount;
            }
            else {
                $cell.textContent = shopCart[i].productInCartSum();
            }
        }
    }
    var $total = document.createElement('div');
    $container.append($total);
    
    if (shopCart.length == 0) {
        $total.textContent = 'Корзина пуста';
    }
    else {
        $total.textContent = 'В корзине: ' + shopCart.length + ' товаров на сумму ' + totalCartCost() + ' рублей';
    }
}

var $productLayout = document.getElementById('productLayout');
$productLayout.addEventListener('click', handleProductLayoutClick);

function handleProductLayoutClick() {
    if (event.target.tagName === 'BUTTON') {
        if (!shopCart.includes(productLayout[event.target.id])) {
            productLayout[event.target.id].amount = event.target.previousSibling.previousSibling.value;
            shopCart.push(productLayout[event.target.id]);
            cartGeneration();
        }
        else {
            productLayout[event.target.id].amount = +productLayout[event.target.id].amount + +event.target.previousSibling.previousSibling.value;
            cartGeneration();
        }
    }
}

var $modal = document.getElementById('modal');
var $modalContent = document.getElementById('modalContent');
var $close = document.getElementById('close');
$productLayout.addEventListener('click', handleProductLayoutModalClick);
$close.addEventListener('click', handleCloseClick);

function handleProductLayoutModalClick() {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
        $modal.style.display = 'block';
        var $a = event.target.parentElement;
        var path = $a.href;
        var $image = document.createElement('img');
        $image.src = path;
        $modalContent.innerHTML = '';
        $modalContent.appendChild($image);
        console.log(path);
    }
}
function handleCloseClick() {
    $modal.style.display = 'none';
}

