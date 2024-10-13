export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}


export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = ''; 
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cartItems.length;
}


export function renderWithTemplate(template, parent, position = "afterbegin", clear = false, callback = null) {
  if (clear) {
    parent.innerHTML = ''; 
  }

  parent.insertAdjacentHTML(position, template);

  if (callback) {
    callback();
  }
}

async function loadTemplate(templatePath) {
  const response = await fetch(templatePath);
  
  if (response.ok) {
    return response.text();
  } else {
    throw new Error(`Failed to load template: ${templatePath}`);
  }
}

export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");

    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");

    renderWithTemplate(headerTemplate, headerElement, "afterbegin", true, () => {
      updateCartCount();
    });

    renderWithTemplate(footerTemplate, footerElement, "afterbegin", true);
  } catch (error) {
    console.error("Error loading header or footer:", error);
  }
}





