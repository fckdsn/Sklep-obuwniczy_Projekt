
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar");
    const productCards = document.querySelectorAll(".product-card");

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();

        productCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            if (title.includes(query)) {
                card.style.display = "block"; // показуємо
            } else {
                card.style.display = "none"; // ховаємо
            }
        });
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const productCards = document.querySelectorAll(".product-card");
    const brandFilters = document.querySelectorAll(".top-brands [data-brand]");
    const sectionTitle = document.querySelector(".product-grid-section h2");

    brandFilters.forEach(brand => {
        brand.addEventListener("click", () => {
            const selectedBrand = brand.getAttribute("data-brand").toLowerCase();

            // Змінити заголовок
            sectionTitle.textContent = brand.textContent;

            // Фільтрація товарів
            productCards.forEach(card => {
                const cardBrand = card.getAttribute("data-brand").toLowerCase();
                if (cardBrand === selectedBrand) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});


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
    }, 3000); // смена каждые 3 секунды

    showSlide(currentIndex);
  });



function redirectToLogin() {
    window.location.href = "../register/login.html"; 
}

function redirectToSignup() {
    window.location.href = "../register/signup.html";
}

function renderProductData() {
  const container = document.getElementById("product-grid-container");
  products.forEach(product => {
    const card = document.createElement("a");
    card.href = `../items/product1.html?id=${product.id}`; // исправлено, чтобы был шаблонный литерал
    card.className = "product-card-link";
    card.innerHTML = `
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
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderProductData);

