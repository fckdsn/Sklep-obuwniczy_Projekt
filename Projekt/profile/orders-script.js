document.addEventListener("DOMContentLoaded", () => {
    const orderItemsContainer = document.getElementById("order-items");
    const orderTotal = document.getElementById("order-total");
  
    const userId = "testUser"; // test project, hardcoded
    const cartKey = `cart_${userId}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  
    let total = 0;
  
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return;
  
      const subtotal = product.pricePln * item.quantity;
      total += subtotal;
  
      const itemEl = document.createElement("div");
      itemEl.className = "checkout-item";
      itemEl.innerHTML = `
        <img src="${product.images[0]}" alt="${product.title}">
        <div class="checkout-item-details">
          <strong>${product.title}</strong>
          <p>${product.pricePln} PLN</p>
          <p>Size: ${product.size}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
      `;
  
      orderItemsContainer.appendChild(itemEl);
    });
  
    orderTotal.textContent = `${total.toFixed(2)} PLN`;
  });
  