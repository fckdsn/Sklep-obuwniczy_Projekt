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

  cart.forEach((item, index) => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" style="width:50px;height:50px;object-fit:cover;border-radius:6px">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <span>${item.price} PLN</span><br>
        <span>Size: ${item.size}</span><br>
        <div class="qty-controls">
          <button class="qty-btn minus" data-index="${index}">−</button>
          <span class="qty-number">${item.quantity}</span>
          <button class="qty-btn plus" data-index="${index}">+</button>
          <button class="remove-btn" data-index="${index}">
              <img src="../images/delete-icon.png" alt="Remove" style="width:18px; height:18px;" />
          </button>
        </div>
      </div>
    `;
    container.appendChild(el);
  });

  // Добавляем обработчики событий после вставки
  addCartDropdownListeners();
}

function addCartDropdownListeners() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.querySelectorAll(".qty-btn.plus").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // ← вот это важно!
      const index = btn.dataset.index;
      cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    });
  });

  document.querySelectorAll(".qty-btn.minus").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // ← и тут
      const index = btn.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
      }
    });
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // ← и обязательно тут
      const index = btn.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    });
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
