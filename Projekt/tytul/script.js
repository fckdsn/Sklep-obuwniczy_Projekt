document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.getElementById("checkout-button");

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      window.location.href = "../profile/orders.html"; // або твій шлях до orders
    });
  }
});


// 📸 Слайдер (автоматичний + точки)
document.querySelectorAll('.slider').forEach(slider => {
  const slides = slider.querySelectorAll('.slide');
  const dots = slider.querySelectorAll('.dot');
  let currentIndex = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      dots[i]?.classList.toggle('active', i === index);
    });
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 3000);

  showSlide(currentIndex);
});

// 🔁 Переадресація (кнопки)
function redirectToLogin() {
  window.location.href = "../register/login.html";
}
function redirectToSignup() {
  window.location.href = "../register/signup.html";
}

// 🖼️ Рендер товарів на головній
function renderProductData() {
  const container = document.getElementById("product-grid-container");
  if (!container) return;

  const isLoggedIn = window.location.pathname.includes("index_logged");
  const targetPage = isLoggedIn ? "product1.html" : "product1_unlogged.html";

  products.forEach(product => {
    const card = document.createElement("a");
    card.href = `../items/${targetPage}?id=${product.id}`;
    card.className = "product-card-link";

    card.setAttribute("data-brand", product.brand.toLowerCase());

    card.innerHTML = `
      <div class="product-card" data-brand="${product.brand}">
        <div class="image-wrapper">
          <img src="${product.images[0]}" alt="${product.title}">
        </div>
        <div class="product-info">
          <h3>${product.title}</h3>
          <p class="price">${product.pricePln} PLN</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
  setupSearchFilter();
  setupBrandFilter();
}

document.addEventListener("DOMContentLoaded", renderProductData);


function setupSearchFilter() {
  const searchInput = document.querySelector(".search-bar");
  const productLinks = document.querySelectorAll(".product-card-link");

  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();

    productLinks.forEach(link => {
      const title = link.querySelector("h3").textContent.toLowerCase();
      const brand = link.getAttribute("data-brand")?.toLowerCase() || "";

      // Якщо шукаємо, наприклад, "jordan", а бренд Nike — все одно покаже
      const matches =
        title.includes(query) ||
        brand.includes(query) ||
        (query === "jordan" && title.includes("jordan"));

      link.style.display = matches ? "block" : "none";
    });
  });
}
function setupBrandFilter() {
  const brandFilters = document.querySelectorAll(".top-brands [data-brand]");
  const sectionTitle = document.querySelector(".product-grid-section h2");

  brandFilters.forEach(brand => {
    brand.addEventListener("click", () => {
      const selectedBrand = brand.getAttribute("data-brand").toLowerCase();
      const productLinks = document.querySelectorAll(".product-card-link");

      sectionTitle.textContent = brand.textContent;

      productLinks.forEach(link => {
        const cardBrand = link.getAttribute("data-brand")?.toLowerCase() || "";
        const title = link.querySelector("h3").textContent.toLowerCase();

        // 💡 для Jordan — шукаємо по назві
        const matches = selectedBrand === "jordan"
          ? title.includes("jordan")
          : cardBrand === selectedBrand;

        link.style.display = matches ? "block" : "none";
      });
    });
  });
}









