const CAROUSEL_DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};

let carouselImg = document.getElementById('carousel-img');
let carouselLeft = document.getElementById('carousel-left');
let carouselRight = document.getElementById('carousel-right');
let productList = document.getElementById('product-list');
let cartBtn = document.getElementById('cart');
let cartList = document.getElementById('cart-list');

let banners = [];
let carouselIndex = 0;
let products = [];
let cart = [];
let isOpenCart = false;

const formatPrice = (price = '') => new Intl.NumberFormat('en-En').format(price);

const addProductToCart = (index = 0) => {
    cart.push(products[index]);
};

const setProducts = () => {
    products.forEach((product, index) => {
        let div = document.createElement('div');
        div.setAttribute('class', 'card');

        let img = document.createElement('img');
        img.setAttribute('class', 'card-img');
        img.setAttribute('src', product?.img || '');

        let name = document.createElement('h4');
        name.setAttribute('class', 'card-name');
        name.innerHTML = product?.name || '';

        let actionDiv = document.createElement('div');
        actionDiv.setAttribute('class', 'card-action');

        let priceDiv = document.createElement('div');
        priceDiv.setAttribute('class', 'price-container');

        let price = document.createElement('h3');
        const lastPrice = (product?.price - product?.discount) || 0;
        price.setAttribute('class', 'card-price');
        price.innerHTML = `$${formatPrice(lastPrice)}`;

        let discount = document.createElement('h3');
        discount.setAttribute('class', 'card-discount-pirce');
        discount.innerHTML = `$${formatPrice(product?.price || 0)}`;

        let btn = document.createElement('button');
        btn.setAttribute('class', 'card-btn');
        btn.innerHTML = `Order`;
        btn.addEventListener('click', () => addProductToCart(index));

        priceDiv.appendChild(price);
        if (product?.discount > 0) priceDiv.appendChild(discount);
        actionDiv.appendChild(priceDiv);
        actionDiv.appendChild(btn);
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(actionDiv);
        productList.appendChild(div);
    });
};

const getJsonData = (data) => {
    products = data.product;
    banners = data.banners;

    setProducts();
};

const parseJson = (response) => {
    return response.json();
};

fetch('./data.json')
    .then(parseJson)
    .then(getJsonData);

const clickArrowCarousel = (event, direction = CAROUSEL_DIRECTION.LEFT) => {
    const lastIndex = banners.length - 1;

    if (direction === CAROUSEL_DIRECTION.LEFT) {
        if (carouselIndex <= 0) carouselIndex = lastIndex;
        else carouselIndex -= 1;
    }
    else if (direction === CAROUSEL_DIRECTION.RIGHT) {
        if (carouselIndex >= lastIndex) carouselIndex = 0;
        else carouselIndex += 1;
    }

    carouselImg.src = banners[carouselIndex]?.img;
};

const handleClickCart = () => {
    toggleCartList();

    cart.forEach((product, index) => {
        let div = document.createElement('div');
        div.setAttribute('class', 'cart-item');

        let img = document.createElement('img');
        img.setAttribute('class', 'cart-img');
        img.setAttribute('src', product?.img || '');

        let detail = document.createElement('div');
        detail.setAttribute('class', 'cart-detail');

        let name = document.createElement('span');
        name.innerHTML = `${product?.name || ''}`;

        let price = document.createElement('span');
        price.innerHTML = `$${product?.price || 0}`;

        detail.appendChild(name);
        detail.appendChild(document.createElement('br'));
        detail.appendChild(price);
        div.appendChild(img);
        div.appendChild(detail);
        cartList.appendChild(div);
    });
};

const toggleCartList = () => {
    if (isOpenCart) cartList.setAttribute('style', 'display: none');
    else cartList.setAttribute('style', 'display: block');

    isOpenCart = !isOpenCart;
};

const handleClickOutsideCartList = (event) => {
    const { id } = event.target;

    if (id !== 'cart' && isOpenCart) toggleCartList();
};

carouselLeft.addEventListener('click', (e) => clickArrowCarousel(e, CAROUSEL_DIRECTION.LEFT));
carouselRight.addEventListener('click', (e) => clickArrowCarousel(e, CAROUSEL_DIRECTION.RIGHT));
cartBtn.addEventListener('click', handleClickCart);
document.addEventListener('click', handleClickOutsideCartList);

