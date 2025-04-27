document.addEventListener("DOMContentLoaded", () => {
  const payBtn = document.getElementById("pay-btn");

  if (payBtn) {
    payBtn.addEventListener("click", () => {
      // Тут можно сохранить заказ, очистить корзину и т.д.
      
      // Перенаправление на страницу успеха
      window.location.href = "checkout.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const orderTotalElement = document.getElementById("order-total");

  const isSingleOrder = new URLSearchParams(window.location.search).get("single") === "true";

  let itemsToDisplay = [];
  let total = 0;

  if (isSingleOrder) {
    const singleItem = JSON.parse(localStorage.getItem("singleOrderItem"));
    if (singleItem) {
      itemsToDisplay = [singleItem];
    }
  } else {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    itemsToDisplay = cartItems;
  }

  // Перевірка, чи products завантажений
  if (typeof products === "undefined" || !Array.isArray(products)) {
    console.error("❌ products is not loaded or invalid.");
    return;
  }

  cartItemsContainer.innerHTML = "";

  itemsToDisplay.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) {
      console.warn("⚠️ Product not found for ID:", item.id);
      return;
    }

    const quantity = item.quantity || 1;
    const subtotal = quantity * product.pricePln;
    total += subtotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <div class="cart-item-image">
        <img src="${product.images[0]}" alt="${product.title}">
      </div>
      <div class="cart-item-info">
        <strong>${product.title}</strong>
        <p>${product.pricePln} PLN</p>
        <p>Size: ${item.size || product.size}</p>
        <p>Quantity: ${quantity}</p>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  orderTotalElement.textContent = `${total.toFixed(2)} PLN`;
});
