'use strict';

// Check if JavaScript is loading
console.log("JavaScript is loaded correctly!");

// MODAL VARIABLES
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// MODAL FUNCTION
const modalCloseFunc = function () {
  if (modal) modal.classList.add('closed');
};

// MODAL EVENT LISTENERS (CHECK IF ELEMENTS EXIST FIRST)
if (modal && modalCloseBtn && modalCloseOverlay) {
  modalCloseOverlay.addEventListener('click', modalCloseFunc);
  modalCloseBtn.addEventListener('click', modalCloseFunc);
}

// NOTIFICATION TOAST VARIABLES
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// NOTIFICATION TOAST EVENT LISTENER
if (notificationToast && toastCloseBtn) {
  toastCloseBtn.addEventListener('click', function () {
    notificationToast.classList.add('closed');
  });
}

// MOBILE MENU VARIABLES
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

if (mobileMenuOpenBtn.length > 0 && mobileMenuCloseBtn.length > 0) {
  for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
    if (!mobileMenu[i]) continue;

    const mobileMenuCloseFunc = function () {
      mobileMenu[i].classList.remove('active');
      if (overlay) overlay.classList.remove('active');
    };

    mobileMenuOpenBtn[i].addEventListener('click', function () {
      mobileMenu[i].classList.add('active');
      if (overlay) overlay.classList.add('active');
    });

    mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
    if (overlay) overlay.addEventListener('click', mobileMenuCloseFunc);
  }
}

// ACCORDION VARIABLES
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

if (accordionBtn.length > 0) {
  for (let i = 0; i < accordionBtn.length; i++) {
    accordionBtn[i].addEventListener('click', function () {
      if (!this.nextElementSibling) return;

      const clickedBtn = this.nextElementSibling.classList.contains('active');

      for (let j = 0; j < accordion.length; j++) {
        if (clickedBtn) break;
        accordion[j].classList.remove('active');
        accordionBtn[j].classList.remove('active');
      }

      this.nextElementSibling.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
}

// SEARCH & CATEGORY FUNCTIONALITY
const searchField = document.querySelector(".search-field");
const searchButton = document.querySelector(".search-btn");
const productItems = document.querySelectorAll(".showcase");
const featuredSections = document.querySelectorAll(".new-arrival, .trending, .top-rated, .deal-of-the-day");
const categoryLinks = document.querySelectorAll(".panel-list-item a, .submenu-category a, .menu-category a");
const homeButton = document.querySelector(".home-category-btn");

// ADD TO CART FUNCTIONALITY
const cart = [];
const cartCounter = document.querySelector(".cart-counter");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

if (addToCartButtons.length > 0) {
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
      const product = this.closest(".showcase");
      if (!product) return;

      const productName = product.querySelector(".showcase-title")?.innerText;
      const productPrice = product.querySelector(".showcase-price")?.innerText;

      if (!productName || !productPrice) return;

      const existingItem = cart.find(item => item.name === productName);
      if (existingItem) {
        alert("This item is already in your cart.");
        return;
      }

      cart.push({ name: productName, price: productPrice });
      updateCartCounter();
      alert(`Added to cart: ${productName}`);
    });
  });
}

// UPDATE CART COUNTER
function updateCartCounter() {
  if (cartCounter) {
    cartCounter.innerText = cart.length;
  }
}

// CATEGORY FILTER FUNCTION
if (categoryLinks.length > 0) {
  categoryLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const category = this.innerText.trim().toLowerCase();
      console.log("Category Selected:", category);

      productItems.forEach(item => {
        item.style.display = "none";
        const categoryElement = item.querySelector(".showcase-category");
        if (categoryElement && categoryElement.innerText.toLowerCase().includes(category)) {
          item.style.display = "block";
        }
      });

      // Hide featured sections when filtering categories
      featuredSections.forEach(section => {
        section.style.display = "none";
      });
    });
  });
}

// SEARCH FUNCTIONALITY (FIXED)
if (searchButton && searchField) {
  searchButton.addEventListener("click", searchProducts);

  searchField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchProducts();
    }
  });

  function searchProducts() {
    const query = searchField.value.trim().toLowerCase();

    if (query === "") {
      // Show all products and sections if search is empty
      productItems.forEach(item => item.style.display = "block");
      featuredSections.forEach(section => section.style.display = "block");
      return;
    }

    let hasResults = false;

    productItems.forEach(item => {
      const titleElement = item.querySelector(".showcase-title");
      if (!titleElement) return;

      const title = titleElement.innerText.toLowerCase();
      if (title.includes(query)) {
        item.style.display = "block";
        hasResults = true;
      } else {
        item.style.display = "none";
      }
    });

    // Hide featured sections when searching
    featuredSections.forEach(section => {
      section.style.display = hasResults ? "none" : "block";
    });
  }
}

// FIX HOME BUTTON TO SHOW ALL PRODUCTS & SECTIONS
if (homeButton) {
  homeButton.addEventListener("click", function () {
    console.log("✅ Home button clicked, displaying all products and sections.");
    // Clear search field
    searchField.value = "";
    
    // Show all products and sections
    productItems.forEach(item => {
      item.style.display = "block"; // Reset product items to be visible
      console.log("Product item displayed:", item); // Debug log to check each item's display state
    });

    featuredSections.forEach(section => {
      section.style.display = "block"; // Also reset featured sections to be visible
      console.log("Featured section displayed:", section); // Debug log to check each section's display state
    });
  });
}

// ENSURE ALL ITEMS & SECTIONS SHOW WHEN PAGE LOADS
window.addEventListener("load", function () {
  console.log("✅ Page loaded, ensuring all products and sections are visible.");
  productItems.forEach(item => item.style.display = "block");
  featuredSections.forEach(section => section.style.display = "block");
});

// DEBUGGING: LOG ALL BUTTON CLICKS
document.querySelectorAll("button, input[type='search'], .menu-category a, .home-category-btn").forEach(element => {
  element.addEventListener("click", () => console.log("✅ Element clicked:", element));
});