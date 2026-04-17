// ===============================
// SPORTS STORE ADVANCED JS
// ===============================

// Product Data
const products = [
  { id: 1, name: "Cricket Bat", price: 2499 },
  { id: 2, name: "Sports Jersey", price: 999 },
  { id: 3, name: "Running Shoes", price: 1799 },
  { id: 4, name: "Batting Gloves", price: 699 }
];

// Load Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// ADD TO CART
// ===============================
function addToCart(productName) {
  const product = products.find(p => p.name === productName);

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  showToast(productName + " added to cart 🛒");
  updateCartUI();
}

// ===============================
// SAVE CART
// ===============================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// REMOVE ITEM
// ===============================
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

// ===============================
// CHANGE QUANTITY
// ===============================
function changeQuantity(id, amount) {
  const item = cart.find(i => i.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);
  }

  saveCart();
  updateCartUI();
}

// ===============================
// CALCULATE TOTAL
// ===============================
function getTotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

// ===============================
// UPDATE CART UI
// ===============================
function updateCartUI() {
  let cartContainer = document.getElementById("cart");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 😢</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>₹${item.price}</p>
      <div class="qty-controls">
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartContainer.appendChild(div);
  });

  // Total Price
  const totalDiv = document.createElement("h3");
  totalDiv.innerText = "Total: ₹" + getTotal();

  cartContainer.appendChild(totalDiv);
}

// ===============================
// TOAST NOTIFICATION
// ===============================
function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ===============================
// SEARCH FUNCTION
// ===============================
function searchProducts() {
  const input = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.querySelector("h2").innerText.toLowerCase();

    if (title.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// ===============================
// DARK MODE
// ===============================
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

// Load Theme
(function () {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
  }
})();

// ===============================
// INITIAL LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});
