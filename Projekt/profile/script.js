
  
  document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector('.login');
    const signupBtn = document.querySelector('.signup');
    const logoutBtn = document.querySelector('#logout');
    const authButtons = document.querySelector('.auth-buttons');
    const profileIcon = document.querySelector('.profile-icon');
    const menuLinks = document.querySelectorAll('.menu-link');
    const tabContents = document.querySelectorAll('.tab-content');

    let isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    let savedPayments = [];

    function updateAuthUI() {
        if (isLoggedIn) {
            authButtons?.classList.add('hidden');
            profileIcon?.classList.remove('hidden');
        } else {
            authButtons?.classList.remove('hidden');
            profileIcon?.classList.add('hidden');
        }
    }

    loginBtn?.addEventListener('click', () => {
        localStorage.setItem('loggedIn', 'true');
        isLoggedIn = true;
        updateAuthUI();
    });

    signupBtn?.addEventListener('click', () => {
        localStorage.setItem('loggedIn', 'true');
        isLoggedIn = true;
        updateAuthUI();
    });

    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        isLoggedIn = false;
        updateAuthUI();
    });

    document.getElementById("edit-btn").addEventListener("click", function() {
        let isEditing = this.textContent === "Save";

        document.querySelectorAll(".edit-input").forEach(input => {
            input.style.display = isEditing ? "none" : "inline";
        });

        document.querySelectorAll(".profile-section span").forEach(span => {
            span.style.display = isEditing ? "inline" : "none";
        });

        if (isEditing) {
            document.getElementById("name").textContent = document.getElementById("name-input").value;
            document.getElementById("username").textContent = document.getElementById("username-input").value;
            document.getElementById("email").textContent = document.getElementById("email-input").value;
            document.getElementById("shoe-size").textContent = document.getElementById("shoe-size-input").value;
            this.textContent = "Edit";
        } else {
            document.getElementById("name-input").value = document.getElementById("name").textContent;
            document.getElementById("username-input").value = document.getElementById("username").textContent;
            document.getElementById("email-input").value = document.getElementById("email").textContent;
            document.getElementById("shoe-size-input").value = document.getElementById("shoe-size").textContent;
            this.textContent = "Save";
        }
    });

    updateAuthUI();

    tabContents.forEach(content => {
        content.style.display = content.id === 'profile' ? 'block' : 'none';
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const tab = link.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.style.display = content.id === tab ? 'block' : 'none';
            });
        });
    });

    window.showCardForm = () => {
        document.getElementById("card-form").classList.remove("hidden");
        document.getElementById("add-paypal").style.display = "none";
    };

    window.saveCard = () => {
        const cardNumber = document.getElementById("card-number").value;
        const cardName = document.getElementById("card-name").value;
        const cardExpiry = document.getElementById("card-expiry").value;
        const cardCVV = document.getElementById("card-cvv").value;

        if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
            alert("Please fill in all card details.");
            return;
        }

        const maskedCard = `**** **** **** ${cardNumber.slice(-4)} - ${cardName}`;
        savedPayments.push(maskedCard);
        updateSavedPayments();
        showSuccessMessage("Credit card saved!");

        document.getElementById("card-form").classList.add("hidden");
        document.getElementById("add-paypal").style.display = "flex";

        // Очищення форми
        document.getElementById("card-number").value = '';
        document.getElementById("card-name").value = '';
        document.getElementById("card-expiry").value = '';
        document.getElementById("card-cvv").value = '';
    };

    function updateSavedPayments() {
        const savedPaymentsList = document.getElementById("saved-payments");
        savedPaymentsList.innerHTML = '';

        savedPayments.forEach((payment, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("saved-payment-item");
            listItem.innerHTML = `
                <span>${payment}</span>
                <button class="remove-payment-btn" data-index="${index}">Remove</button>
            `;
            savedPaymentsList.appendChild(listItem);
        });

        document.querySelectorAll(".remove-payment-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                const idx = this.getAttribute("data-index");
                savedPayments.splice(idx, 1);
                updateSavedPayments();
            });
        });
    }

    document.getElementById("add-address-btn").addEventListener("click", addAddress);

    function addAddress() {
        const addressLine = document.getElementById("address-line").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const zipCode = document.getElementById("zip-code").value;
        const country = document.getElementById("country").value;

        if (!addressLine || !city || !state || !zipCode || !country) {
            alert("Please fill in all fields.");
            return;
        }

        const savedAddresses = document.getElementById("saved-addresses");
        const addressDiv = document.createElement("div");
        addressDiv.classList.add("saved-address");
        addressDiv.innerHTML = `
            <p><strong>${addressLine}</strong></p>
            <p>${city}, ${state}, ${zipCode}</p>
            <p>${country}</p>
            <button class="remove-address-btn">Remove</button>
        `;

        savedAddresses.appendChild(addressDiv);
        clearAddressForm();
        showSuccessMessage("Address added!");
        attachRemoveAddressEvent();
    }

    function attachRemoveAddressEvent() {
        document.querySelectorAll(".remove-address-btn").forEach(button => {
            button.addEventListener("click", function() {
                this.parentElement.remove();
            });
        });
    }

    function clearAddressForm() {
        document.getElementById("address-line").value = '';
        document.getElementById("city").value = '';
        document.getElementById("state").value = '';
        document.getElementById("zip-code").value = '';
        document.getElementById("country").value = '';
    }

    function showSuccessMessage(message) {
        let msgDiv = document.createElement('div');
        msgDiv.classList.add('success-message');
        msgDiv.textContent = message;
        document.body.appendChild(msgDiv);

        setTimeout(() => {
            msgDiv.remove();
        }, 3000);
    }

    window.addPayPal = () => {
        window.open("https://www.paypal.com", "_blank");
    };

    document.getElementById("add-card").addEventListener("click", showCardForm);
    document.getElementById("add-paypal").addEventListener("click", addPayPal);

    // Ініціалізація пустих ордерів
    const orders = [];
    const ordersList = document.getElementById("orders-list");
    const noOrders = document.getElementById("no-orders");

    if (ordersList && noOrders) {
        if (orders.length === 0) {
            noOrders.style.display = "block";
            ordersList.style.display = "none";
        } else {
            noOrders.style.display = "none";
            ordersList.style.display = "flex";

            orders.forEach(order => {
                const card = document.createElement("div");
                card.className = "order-card";
                card.innerHTML = `
                  <p><strong>Order #${order.id}</strong></p>
                  <p>${order.status}</p>
                `;
                ordersList.appendChild(card);
            });
        }
    }
});

function renderRelatedProducts() {
    const container = document.getElementById("related-container");
    if (!container) return;

    const currentPage = window.location.pathname.split("/").pop();
    const isUnlogged = currentPage === "product1_unlogged.html";
    const targetPage = isUnlogged ? "product1_unlogged.html" : "product1.html";

    // ✅ Перемешиваем товары
    const shuffled = [...products].sort(() => 0.5 - Math.random());

    // ✅ Берем 5 случайных
    const related = shuffled.slice(0, 5);

    related.forEach(product => {
        const a = document.createElement("a");
        a.href = `${targetPage}?id=${product.id}`;
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

