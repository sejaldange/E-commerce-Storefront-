// js/admin.js

let editingIndex = null;

function loadAdminProducts() {
  const listDiv = document.getElementById("admin-product-list");
  listDiv.innerHTML = "";

  products.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "card";
    item.innerHTML = `
      <strong>${p.name}</strong><br>
      ₹${p.price} | ⭐${p.rating}<br>
      <small>${p.category}</small><br>
      <img src="${p.image}" width="100"><br>
      <button onclick="editProduct(${i})">Edit</button>
      <button onclick="deleteProduct(${i})">Delete</button>
    `;
    listDiv.appendChild(item);
  });
}

function addOrUpdateProduct() {
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);
  const rating = Number(document.getElementById("rating").value);
  const category = document.getElementById("category").value.trim();
  const image = document.getElementById("image").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!name || !price || !category || !image) {
    alert("Please fill all required fields.");
    return;
  }

  const productData = {
    id: editingIndex !== null ? products[editingIndex].id : Date.now(),
    name,
    price,
    rating,
    category,
    image,
    description
  };

  if (editingIndex !== null) {
    products[editingIndex] = productData;
    editingIndex = null;
  } else {
    products.push(productData);
  }

  clearForm();
  loadAdminProducts();
}

function editProduct(index) {
  editingIndex = index;
  const p = products[index];
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("rating").value = p.rating;
  document.getElementById("category").value = p.category;
  document.getElementById("image").value = p.image;
  document.getElementById("description").value = p.description;
}

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    loadAdminProducts();
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("rating").value = "";
  document.getElementById("category").value = "";
  document.getElementById("image").value = "";
  document.getElementById("description").value = "";
}

function logout() {
  localStorage.removeItem("adminToken");
  alert("Logged out successfully.");
  window.location.href = "login.html";
}
