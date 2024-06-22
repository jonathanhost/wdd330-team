import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId).then()
    const product = this.product


    
    const fullname = product.Name;
    const brand = product.Brand.Name ;
    const name = product.NameWithoutBrand;
    const price = product.FinalPrice;
    const color = product.Colors[0].ColorName;
    const description = product.DescriptionHtmlSimple;
    const img = product.Image;
    const id = product.Id;

    const title = document.querySelector('title');
    title.innerHTML = 'Sleep Outside | '+fullname

    const details = document.querySelector('.product-detail');
    const h2 = details.querySelector('h2');
    const h3 = details.querySelector('h3');
    h2.innerHTML = name;
    h3.innerHTML = brand;

 
    const image = document.querySelector('#product-image');
    image.src= img;
    image.alt = "texto";

    const cart_price = document.querySelector('.product-card__price');
    cart_price.innerHTML = "$"+price

    const product__color = document.querySelector('.product__color');
    product__color.innerHTML = color;

    const product__description = document.querySelector('.product__description');
    product__description.innerHTML = description;


    const button = document.getElementById('addToCart');
    button.dataset.id = id;

    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
    }

    addToCart() {
      setLocalStorage("so-cart", this.product);
    }
}

