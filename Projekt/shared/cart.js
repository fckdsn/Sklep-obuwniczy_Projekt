console.log("✅ cart.js connected");

console.log("cart.js: ", document.getElementById("cart-icon"));


function initCartDropdown() {
  const cartIcon = document.getElementById("cart-icon");
  const cartDropdown = document.getElementById("cart-dropdown");

  if (!cartIcon || !cartDropdown) {
    console.warn("🛑 cart-icon або cart-dropdown не знайдено");
    return;
  }

  cartIcon.addEventListener("click", (e) => {
    console.log("🛒 cart clicked");
    e.stopPropagation();
    cartDropdown.classList.toggle("active");
    renderCartItems();
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".cart-container")) {
      cartDropdown.classList.remove("active");
    }
  });
}

function renderCartItems() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:#777">Your cart is empty</p>`;
    return;
  }

  cart.forEach(item => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" style="width:50px;height:50px;object-fit:cover;border-radius:6px">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <span>${item.price} PLN</span><br>
        <span>Size: ${item.size}</span><br>
        <span>Quantity: ${item.quantity}</span>
      </div>
    `;
    container.appendChild(el);
  });
}

function setupAddToCartButton() {
  const cartBtn = document.querySelector(".cart-btn");
  if (!cartBtn) return;

  cartBtn.addEventListener("click", () => {
    const id = new URLSearchParams(window.location.search).get("id");
    const product = products.find(p => p.id == id);
    if (!product) return;

    const selectedSize = document.querySelector(".size.selected")?.textContent.trim();
    const quantity = parseInt(document.querySelector(".qty-number").textContent);

    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i.id == product.id && i.size === selectedSize);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        image: product.images[0],
        price: product.pricePln,
        quantity,
        size: selectedSize
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showToast("Added to cart!");
    renderCartItems();
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  initCartDropdown();
  setupAddToCartButton();
  renderCartItems();
});
