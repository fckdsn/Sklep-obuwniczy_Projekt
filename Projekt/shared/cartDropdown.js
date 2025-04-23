// shared/cartDropdown.js
console.log("🧩 cartDropdown.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const cartDropdown = document.getElementById("cart-dropdown");

  if (!cartIcon || !cartDropdown) {
    console.warn("🛑 cart icon or dropdown not found");
    return;
  }

  cartIcon.addEventListener("click", (e) => {
    console.log("🛒 cart icon clicked");
    e.stopPropagation();
    cartDropdown.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".cart-container")) {
      cartDropdown.classList.remove("active");
    }
  });
});
