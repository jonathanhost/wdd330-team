import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
    <span class="remove-button" data-id="${item.Id}">X</span>
  `;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.cartItems = [];
    this.total = 0;
  }

  async init() {
    this.cartItems = getLocalStorage(this.key) || [];
    this.calculateListTotal();
    this.renderCartContents();
  }

  calculateListTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  }

  removeItemFromLocalStorage(itemId) {
    // Encontra o índice do item com base no itemId
    const indexToRemove = this.cartItems.findIndex(item => item.Id === itemId);
    if (indexToRemove !== -1) {
      this.cartItems.splice(indexToRemove, 1);
      localStorage.setItem(this.key, JSON.stringify(this.cartItems));
      this.calculateListTotal();
      this.renderCartContents();
    } else {
      console.error(`Item with ID ${itemId} not found in cart`);
    }
  }

  renderCartContents() {
    const cartItemsHTML = this.cartItems.map(item => cartItemTemplate(item)).join("");
    document.querySelector(this.parentSelector).innerHTML = cartItemsHTML;
    document.querySelector(".list-total").innerText = `Total: $${this.total.toFixed(2)}`;
    document.querySelectorAll(".remove-button").forEach(button => {
      button.addEventListener("click", () => {
        const itemId = button.getAttribute("data-id");
        this.removeItemFromLocalStorage(itemId);
        console.log(`Item with ID ${itemId} removed from cart and localStorage`);
      });
    });
  }
}
