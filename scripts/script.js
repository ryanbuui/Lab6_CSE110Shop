// Script.js
let cartCount = 0;
let currCart = [];

myStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('products')) {
    console.log("Products have already been fetched and stored.");
  } else {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => localStorage.setItem('products', JSON.stringify(data)));
  }

  let products = localStorage.getItem('products');

  JSON.parse(products).forEach(createProduct);

  loadCart();
});

function createProduct(value) {
  let product = `<product-item img-url="${value.image}" img-alt="${value.title}" title="${value.title}" price="$${value.price}" id="${value.id}" >`
  document.getElementById('product-list').insertAdjacentHTML('beforeend', product);
}

function clickBtn(event) {
  if (event.target.innerHTML == "Add to Cart") {
    event.target.innerHTML = "Remove from cart";
    cartCount = cartCount + 1;
    document.getElementById("cart-count").innerHTML = cartCount;
    currCart.push(event.target.value);
  } else {
    event.target.innerHTML = "Add to Cart";
    cartCount = cartCount - 1;
    document.getElementById("cart-count").innerHTML = cartCount;
    currCart = currCart.filter((item) => {
      return item !== event.target.value;
    });
  }

  localStorage.setItem('cart', JSON.stringify(currCart));
}

function loadCart() {
  if (localStorage.getItem('cart')) {
    currCart = JSON.parse(localStorage.getItem('cart'));
    cartCount = currCart.length;
    document.getElementById("cart-count").innerHTML = cartCount;
    currCart.forEach((id) => {
      document.getElementById(id).shadowRoot.querySelector('button').innerHTML = "Remove from cart";
    });
  }
}