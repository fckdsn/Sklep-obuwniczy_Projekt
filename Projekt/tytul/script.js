
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

function redirectToLogin() {
    window.location.href = "../register/login.html"; 
}

function redirectToSignup() {
    window.location.href = "../register/signup.html";
}


