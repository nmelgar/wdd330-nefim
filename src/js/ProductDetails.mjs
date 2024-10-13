import { setLocalStorage, updateCartCount } from "./utils.mjs";

function productDetailsTemplate(product) {
  // Discount calculation
  const discountPercentage = ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100;

  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
    <p class="product-card__price">$${product.FinalPrice} | <span class="discount-indicator">( ${discountPercentage.toFixed(0)}% off )</span></p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      this.renderProductDetails("main");

      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    } catch (error) {
      console.error("Error fetching product details:", error);
      // handle the error
      this.renderErrorMessage("An error occurred while fetching product details.");
    }
  }

  addToCart() {
    let currentCart = JSON.parse(localStorage.getItem("so-cart"));

    if (!Array.isArray(currentCart)) {
      currentCart = [];
    }

    // handle quantity input if needed
    const quantityInput = document.getElementById("quantityInput");
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    // ddd product to the cart
    const productToAdd = { ...this.product, quantity };
    currentCart.push(productToAdd);
    localStorage.setItem("so-cart", JSON.stringify(currentCart));

    // update cart count
    updateCartCount();

    // alert user about adding to cart
    alert("Product added to cart!");
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
  }

  renderErrorMessage(message) {
    // create new element to display error message
    const errorMessageElement = document.createElement("p");
    errorMessageElement.textContent = message;
    errorMessageElement.className = "error-message";

    // append error message to main content area
    const mainElement = document.querySelector("main");
    mainElement.appendChild(errorMessageElement);
  }
}