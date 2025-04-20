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
    const sizeElements = document.querySelectorAll(".size");
    const sizeText = document.getElementById("size");
  
    sizeElements.forEach((el) => {
      el.addEventListener("click", () => {
        sizeElements.forEach((s) => s.classList.remove("selected"));
        el.classList.add("selected");
        sizeText.textContent = "US " + el.textContent.trim();
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    // ... код с выбором размера
  
    const qtyMinus = document.querySelector('.qty-btn:first-child');
    const qtyPlus = document.querySelector('.qty-btn:last-child');
    const qtyNumber = document.querySelector('.qty-number');
  
    qtyMinus.addEventListener('click', () => {
      let qty = parseInt(qtyNumber.textContent);
      if (qty > 1) {
        qtyNumber.textContent = qty - 1;
      }
    });
  
    qtyPlus.addEventListener('click', () => {
      let qty = parseInt(qtyNumber.textContent);
      qtyNumber.textContent = qty + 1;
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const cartBtn = document.querySelector(".cart-btn");
  
    cartBtn.addEventListener("click", () => {
      const selectedSize = document.querySelector(".size.selected")?.textContent.trim();
      const quantity = document.querySelector(".qty-number").textContent;
      const title = document.getElementById("product-title").textContent;
      const price = document.getElementById("price-pln").textContent;
  
      if (!selectedSize) {
        alert("Please select a size before adding to cart.");
        return;
      }
  
      const item = {
        title,
        size: selectedSize,
        quantity,
        price,
      };
  
      // Пример: сохраняем в localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
  
      showToast("Added to cart!");
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
  
    // Отримуємо id з URL, щоб виключити поточний товар
    const params = new URLSearchParams(window.location.search);
    const currentId = parseInt(params.get("id"));
  
    // Фільтруємо товари: беремо не той, що зараз відкритий
    const related = products
      .filter(p => p.id !== currentId)
      .slice(0, 3); // беремо максимум 3
  
    // Створюємо картки
    related.forEach(product => {
      const a = document.createElement("a");
      a.href = `product1.html?id=${product.id}`; // або правильний шлях
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
  
  // Викликаємо після завантаження
  document.addEventListener("DOMContentLoaded", renderRelatedProducts);
  
  
  
  
  
  
  