import { getLocalStorage, setLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ProductData('tents');

const productId = getParams('product');
const product = new ProductDetails(productId, dataSource);
product.init();
let products = getLocalStorage("so-cart") || [];


function addProductToCart(product) {
  products.push(product);
  setLocalStorage("so-cart", products); // Salva no localStorage
  window.location.href = "../cart/index.html";
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
