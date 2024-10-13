import {
  getLocalStorage,
  updateCartCount,
  setLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';


const cart = new ShoppingCart('.product-list');
cart.init();

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();
});
