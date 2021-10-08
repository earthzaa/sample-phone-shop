const CAROUSEL_DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};

let carouselImg = document.getElementById('carousel-img');
let carouselLeft = document.getElementById('carousel-left');
let carouselRight = document.getElementById('carousel-right');
let productList = document.getElementById('product-list');

let banners = [];
let carouselIndex = 0;
let products = [];

const setProducts = () => {

};

const getJsonData = (data) => {
    products = data.product;
    banners = data.banners;
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

carouselLeft.addEventListener('click', (e) => clickArrowCarousel(e, CAROUSEL_DIRECTION.LEFT));
carouselRight.addEventListener('click', (e) => clickArrowCarousel(e, CAROUSEL_DIRECTION.RIGHT));

