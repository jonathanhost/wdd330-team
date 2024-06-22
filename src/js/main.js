import ProductData from "./ProductData.mjs";

import ProductListing from "./ProductList.mjs";


const category = "tents"

const dataSource = new ProductData('tents');

const listElement = document.querySelector('.product-list');

const product_list = new ProductListing(category,dataSource,listElement);
product_list.init();

