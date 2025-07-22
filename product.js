// js/product.js
const productId = new URLSearchParams(window.location.search).get("id");
const detailDiv = document.getElementById("product-detail");
const addToCartBtn = document.getElementById("addToCartBtn");

const product = products.find(p => p.id === Number(productId));

if (!product) {
  detailDiv.innerHTML = "<p>Product not found.</p>";
  addToCartBtn.style.display = "none";
} else {
  detailDiv.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" width="250"><br>
    <p>${product.description}</p>
    <p><strong>Price:</strong> ₹${product.price}</p>
    <p><strong>Rating:</strong> ⭐${product.rating}</p>
    <p><strong>Category:</strong> ${product.category}</p>
  `;
}

// Add to Cart and save in localStorage
addToCartBtn.onclick = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
};
