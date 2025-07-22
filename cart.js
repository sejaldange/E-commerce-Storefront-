// js/cart.js
const cartItemsDiv = document.getElementById("cart-items");
const totalDiv = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    checkoutBtn.style.display = "none";
    totalDiv.textContent = "Total: ₹0";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${item.image}" width="100">
      <p><strong>${item.name}</strong></p>
      <p>₹${item.price}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
    total += item.price;
  });

  totalDiv.textContent = `Total: ₹${total}`;
  checkoutBtn.style.display = "inline-block";
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

checkoutBtn.onclick = () => {
  alert("Order placed!");
  localStorage.removeItem("cart");
  window.location.href = "confirm.html";
};

renderCart();
