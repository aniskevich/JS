var sum = 0;
var $accordion = document.getElementById('accordion');
var $shoppingCart = document.getElementById('shoppingCart');
var $shopCartLayout = document.getElementById('shopCartLayout');
var $shipping = document.getElementById('shipping');
var $comment = document.getElementById('comment');
var $prevSlide = document.getElementById('prevSlide');
var $nextSlide = document.getElementById('nextSlide');
var $removeBtn;
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
    $shoppingCart.innerHTML = '';
    sum = 0;
    for (var i = 0; i < shopCart.length; i++) {
        var $row = document.createElement('div');
        $shoppingCart.append($row);
        $row.classList.add('row');
        for (var j = 0; j < 9; j++) {
            var $cell = document.createElement('div');
            $row.append($cell);
            $cell.classList.add('cell');
            if (j < 6) {
                $cell.textContent = shopCart[i].productDescription[Object.keys(shopCart[i].productDescription)[j]];
            }
            else if (j == 6) {
                $cell.textContent = shopCart[i].amount;
            }
            else if (j == 7) {
                $cell.textContent = shopCart[i].productInCartSum();
            }
            else {
                $removeBtn = document.createElement('button');
                $removeBtn.classList.add('removeBtn');
                $removeBtn.id = i;
                $cell.appendChild($removeBtn);
                $removeBtn.textContent = 'remove';
                $removeBtn.addEventListener('click', handleRmBtnClick);
                function handleRmBtnClick() {
                    $shoppingCart.removeChild(event.target.parentElement.parentElement);
                    shopCart.splice(event.target.id, 1);
                    cartGeneration();
                }
            }

        }
    }

    var $total = document.createElement('div');
    $shoppingCart.append($total);

    var $nextBtn = document.createElement('button');
    $nextBtn.classList.add('nextBtn');
    $shoppingCart.append($nextBtn);

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
        $shoppingCart.classList.remove('hidden');
        $shipping.classList.add('hidden');
        $comment.classList.add('hidden');
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

$accordion.addEventListener('click', handleHeaderClick);
function handleHeaderClick() {
    if (event.target.tagName === 'H3') {
        if (!event.target.nextSibling.nextSibling.classList.contains('hidden')) {
            event.target.nextSibling.nextSibling.classList.add('hidden');
        }
        else {
            for (var i = 0; i < $accordion.children.length; i++) {
                $accordion.children[i].children[1].classList.add('hidden');
            }
            event.target.nextSibling.nextSibling.classList.toggle('hidden');
        }

    }
}

$accordion.addEventListener('click', handleNxtBtnClick);
function handleNxtBtnClick() {
    if ((event.target.tagName === 'BUTTON') && (event.target.classList.contains('nextBtn'))) {
        event.target.parentElement.classList.add('hidden');
        event.target.parentElement.parentElement.nextSibling.nextSibling.children[1].classList.remove('hidden');
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
    }
    $prevSlide.addEventListener('click', handlePrevSlideClick);
    $nextSlide.addEventListener('click', handleNextSlideClick);
    function handlePrevSlideClick() {
        var pos = path.slice(path.length - 5, path.length - 4);
        switch (pos) {
            case '1':
                path = path.slice(0, path.length - 5) + 3 + '.jpg';
                break;
            case '2':
                path = path.slice(0, path.length - 5) + 1 + '.jpg';
                break;
            case '3':
                path = path.slice(0, path.length - 5) + 2 + '.jpg';
                break;
        }
        $image.src = path;
        $modalContent.innerHTML = '';
        $modalContent.appendChild($image);
    }
    function handleNextSlideClick() {
        var pos = path.slice(path.length - 5, path.length - 4);
        switch (pos) {
            case '1':
                path = path.slice(0, path.length - 5) + 2 + '.jpg';
                break;
            case '2':
                path = path.slice(0, path.length - 5) + 3 + '.jpg';
                break;
            case '3':
                path = path.slice(0, path.length - 5) + 1 + '.jpg';
                break;
        }
        $image.src = path;
        $modalContent.innerHTML = '';
        $modalContent.appendChild($image);
    }
}
function handleCloseClick() {
    $modal.style.display = 'none';
}


