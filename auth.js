// js/auth.js

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "admin123") {
    localStorage.setItem("adminToken", "loggedin");
    alert("Login successful!");
    window.location.href = "admin.html";
  } else {
    alert("Invalid username or password");
  }
}

// For route protection on admin.html
function checkAuth() {
  if (localStorage.getItem("adminToken") !== "loggedin") {
    alert("Unauthorized. Please login.");
    window.location.href = "login.html";
  }
}
