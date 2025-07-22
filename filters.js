// js/filters.js
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const priceFilter = document.getElementById("priceFilter");
const ratingFilter = document.getElementById("ratingFilter");
const categoryFilter = document.getElementById("categoryFilter");

function renderProducts(list) {
  productList.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.innerHTML = `
      <img src="${p.image}" width="150"><br>
      <strong>${p.name}</strong><br>
      ₹${p.price} | ⭐${p.rating}<br>
      <a href="product.html?id=${p.id}">View</a>
    `;
    card.className = "card";
    productList.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...products];
  const search = searchInput.value.toLowerCase();
  const price = priceFilter.value;
  const rating = ratingFilter.value;
  const category = categoryFilter.value;

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }

  if (price) {
    const [min, max] = price.split("-").map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  if (rating) {
    filtered = filtered.filter(p => p.rating >= Number(rating));
  }

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  renderProducts(filtered);
}

// Fill category dropdown dynamically
function populateCategoryFilter() {
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

searchInput.addEventListener("input", applyFilters);
priceFilter.addEventListener("change", applyFilters);
ratingFilter.addEventListener("change", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

populateCategoryFilter();
renderProducts(products);
