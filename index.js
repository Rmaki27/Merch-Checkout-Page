import { merchItems } from "./data.js";
import {
  getCart,
  addToCart,
  calculateItemTotals,
  getTotalCartPrice,
  removeFromCart,
  completePayment,
} from "./utils/cart.js";

function cartClickHandler(e) {
  // find match in merchItems
  merchItems.forEach(function (item, index) {
    // if match found
    if (e.target.dataset[item.id]) {
      addToCart(item);

      const updatedCart = getCart();
      // console.log(updatedCart)
      renderCartSummary(updatedCart);
    }
  });

  // console.log(e.target.dataset.itemToRemove)
  if (e.target.dataset.itemToRemove) {
    console.log(e.target.dataset.itemToRemove);
    console.log("test");
    removeFromCart(getCart(), e.target.dataset.itemToRemove);
    renderCartSummary(getCart());
  }
}

function payBtnClickHandler() {
  document.body.innerHTML = `<h2>Thank you for Submitting your order! </h2>
        <p>Your items will be arriving at some point in the near future</p>`;

  document.getElementById("modal").classList.add("hidden");
  document.getElementById("submit-btn").classList.add("hidden");

  completePayment();
}

function submitBtnClickHandler() {
  document.getElementById("modal").classList.remove("hidden");
}

document.addEventListener("click", cartClickHandler);
document
  .getElementById("pay-btn")
  .addEventListener("click", payBtnClickHandler);
document
  .getElementById("submit-btn")
  .addEventListener("click", submitBtnClickHandler);

function renderItems() {
  let itemsHtml = "";

  merchItems.forEach(function (item) {
    itemsHtml += `
        <div class="merch-item">
            <div class="item-details">  
            <img src="${item.image}" alt="${item.itemName} image" class="item-image">
                <div>
                  <h2 class="item-name">${item.itemName}</h2>
                  <p class="item-price">$${item.price}</p>
                </div>
            </div>
            <i class="gg-add" id="gg-add" data-${item.id}="${item.id}"></i>    
        </div>`;
  });

  document.getElementById("items").innerHTML = itemsHtml;
}

function renderCartSummary(cart) {
  if (cart.length === 0) {
    document.getElementById("cart").innerHTML = "";
    return;
  }

  const cartItemsCost = calculateItemTotals(cart);
  let cartHtml = '<h2 class="order-title">Your Order</h2>';

  cartItemsCost.forEach((item) => {
    cartHtml += `
        <div class="cart-item">
            <div>
                <h2 class="cart-item-name">${item.itemName} ${
      item.quantity > 1 ? `(x${item.quantity})` : ""
    }</h2>
                <p class="remove" data-item-to-remove=${item.id}>remove</p>
            </div>
            <p class="cart-price">$${item.total}</p>
        </div>`;
  });
  const totalCartCost = getTotalCartPrice(calculateItemTotals(cart));

  cartHtml += `<div class="total-cost-container">
                    <h2 class="total-cost-text">Total Cost</h2>
                    <h2 class="total-cost-price">$${totalCartCost}</h2>
                 </div>`;

  document.getElementById("cart").innerHTML = cartHtml;
}

function renderInitialCart() {
  const cart = getCart();

  if (cart.length > 0) {
    renderCartSummary(cart);
  }
}

renderInitialCart();
renderItems();
