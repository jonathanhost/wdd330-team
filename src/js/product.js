import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Retrieve cart items if exists, if not define empty array
  let cart = getLocalStorage("so-cart");

  // If no array, initialize it as an empty array
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add product to cart
  cart.push(product);

  // Save cart with new product
  setLocalStorage("so-cart", cart);
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
