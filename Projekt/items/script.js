let sizeQuantities = {};
let selectedSize = null;
const qtyNumber = document.querySelector(".qty-number");



document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.getElementById("checkout-button");

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      const userId = localStorage.getItem("currentUserId");

      // Если пользователь не залогинен — можно задать дефолтного (тестового)
      if (!userId) {
        localStorage.setItem("currentUserId", "testUser");
      }

      // Переход на страницу заказов
      window.location.href = "../profile/orders.html";
    });
  }
});

function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const productData = products.find(p => p.id === id);
  if (!productData) {
    document.body.innerHTML = "<h2>Product not found</h2>";
    return;
  }

  // Заголовок
  document.getElementById("product-title").textContent = productData.title;

  // Цены
  document.getElementById("price-pln").textContent = productData.pricePln;

  // Бренд, размер
  document.getElementById("brand").textContent = productData.brand;
  document.getElementById("size").textContent = productData.size;

  document.getElementById("color").textContent = productData.color;

  // Основное изображение
  const mainImage = document.getElementById("main-image");
  mainImage.src = productData.images[0];
  mainImage.alt = productData.title;

  // Миниатюры
  const thumbs = document.getElementById("thumbnails");
  thumbs.innerHTML = "";
  productData.images.forEach((src) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.classList.add("thumbnail");
    thumb.addEventListener("click", () => {
      mainImage.src = src;
    });
    thumbs.appendChild(thumb);
  });
}

document.addEventListener("DOMContentLoaded", loadProduct);

 
  // 👉 Обработчик размеров — ВНЕ loadProduct


  document.addEventListener("DOMContentLoaded", function () {

  function updateQtyDisplay() {
    if (selectedSize) {
      qtyNumber.textContent = sizeQuantities[selectedSize] || "1";
    }
  }

  function attachQtyButtons() {
    const qtyMinus = document.querySelector('.qty-btn:first-child');
    const qtyPlus = document.querySelector('.qty-btn:last-child');

    qtyMinus.addEventListener('click', () => {
      if (!selectedSize) return;
      let qty = parseInt(qtyNumber.textContent);
      if (qty > 1) {
        qtyNumber.textContent = qty - 1;
        sizeQuantities[selectedSize] = qty - 1;
      }
    });

    qtyPlus.addEventListener('click', () => {
      if (!selectedSize) return;
      let qty = parseInt(qtyNumber.textContent);
      qtyNumber.textContent = qty + 1;
      sizeQuantities[selectedSize] = qty + 1;
    });
  }

  // Назначаем обработчики для кнопок +/- сразу
  attachQtyButtons();

  // Назначаем обработчики для размеров
  document.querySelectorAll(".size").forEach(el => {
    el.addEventListener("click", () => {
      document.querySelectorAll(".size").forEach(s => s.classList.remove("selected"));
      el.classList.add("selected");

      selectedSize = el.textContent.trim();
      updateQtyDisplay();
    });
  });
});

  
  

    
  

  
  
      

  document.addEventListener("DOMContentLoaded", function () {
    const orderBtn = document.querySelector(".order-btn");
  
    orderBtn.addEventListener("click", () => {
      window.location.href = "../profile/orders.html";
    });
  });

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
  
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  function renderRelatedProducts() {
    const container = document.getElementById("related-container");
    if (!container) return;
  
    // 1. Отримуємо ID з URL
    const params = new URLSearchParams(window.location.search);
    const currentId = parseInt(params.get("id"));
  
    // 2. Визначаємо, на якій сторінці ми знаходимося (логін / без логіна)
    const currentPage = window.location.pathname.split("/").pop(); // наприклад: "product1_unlogged.html"
    const isUnlogged = currentPage === "product1_unlogged.html";
    const targetPage = isUnlogged ? "product1_unlogged.html" : "product1.html";
  
    // 3. Фільтруємо товари (крім поточного)
    const related = products
      .filter(p => p.id !== currentId)
      .slice(0, 5);
  
    // 4. Створюємо картки
    related.forEach(product => {
      const a = document.createElement("a");
      a.href = `${targetPage}?id=${product.id}`; // 👉 динамічно
      a.className = "product-card-link";
      a.innerHTML = `
        <div class="product-card">
          <div class="image-wrapper">
            <img src="${product.images[0]}" alt="${product.title}">
          </div>
          <div class="product-info">
            <h3>${product.title}</h3>
            <p class="price">${product.pricePln} PLN</p>
          </div>
        </div>
      `;
      container.appendChild(a);
    });
  }
  
  document.addEventListener("DOMContentLoaded", renderRelatedProducts);

  document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cart-icon");
    const cartDropdown = document.getElementById("cart-dropdown");
  
    cartIcon.addEventListener("click", (e) => {
        e.stopPropagation(); // щоб клік поза меню не одразу закривав
        cartDropdown.classList.toggle("active");
        renderCartItems();
    });
  
    // Закриття випадаючого вікна при кліку поза ним
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".cart-container")) {
            cartDropdown.classList.remove("active");
        }
    });
  });

  // ✅ Add this script in script.js or directly in <script> tag after data.js is loaded


  
  document.addEventListener("DOMContentLoaded", () => {
    const orderBtn = document.querySelector(".order-btn");
  
    orderBtn.addEventListener("click", () => {
      const selectedSize = document.querySelector(".size.selected")?.textContent || "Unknown";
      const quantity = parseInt(document.querySelector(".qty-number").textContent);
      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get("id"));
  
      localStorage.setItem("singleOrderItem", JSON.stringify({
        id: id,
        quantity: quantity,
        size: selectedSize
      }));
  
      window.location.href = "../profile/orders.html?single=true";
    });
  });
  
  
  
