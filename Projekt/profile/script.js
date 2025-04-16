document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector('.login');
    const signupBtn = document.querySelector('.signup');
    const logoutBtn = document.querySelector('#logout');
    const authButtons = document.querySelector('.auth-buttons');
    const profileIcon = document.querySelector('.profile-icon');
    const menuLinks = document.querySelectorAll('.menu-link');
    const tabContents = document.querySelectorAll('.tab-content');

    let isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const savedPayments = [];

    // Оновлення інтерфейсу аутентифікації
    function updateAuthUI() {
        if (isLoggedIn) {
            authButtons?.classList.add('hidden');
            profileIcon?.classList.remove('hidden');
        } else {
            authButtons?.classList.remove('hidden');
            profileIcon?.classList.add('hidden');
        }
    }

    // Вхід
    loginBtn?.addEventListener('click', () => {
        localStorage.setItem('loggedIn', 'true');
        isLoggedIn = true;
        updateAuthUI();
    });

    // Реєстрація
    signupBtn?.addEventListener('click', () => {
        localStorage.setItem('loggedIn', 'true');
        isLoggedIn = true;
        updateAuthUI();
    });

    // Вихід
    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        isLoggedIn = false;
        updateAuthUI();
    });

    // Кнопка редактирования профиля
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

    // Открытие формы добавления карты
    window.showCardForm = () => {
        document.getElementById("card-form").classList.remove("hidden");
        document.getElementById("add-paypal").style.display = "none";
    };

    // Сохранение данных кредитной карты
    window.saveCard = () => {
        const cardNumber = document.getElementById("card-number").value;
        const cardName = document.getElementById("card-name").value;
        const cardExpiry = document.getElementById("card-expiry").value;
        const cardCVV = document.getElementById("card-cvv").value;

        if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
            alert("Please fill in all card details.");
            return;
        }

        // Маскируем номер карты и сохраняем
        const maskedCard = `**** **** **** ${cardNumber.slice(-4)}`;
        savedPayments.push(`${maskedCard} - ${cardName}`);
        updateSavedPayments();
        showSuccessMessage("Credit card saved!");

        // Скрываем форму и возвращаем кнопку PayPal
        document.getElementById("card-form").classList.add("hidden");
        document.getElementById("add-paypal").style.display = "flex";
    };

    // Обновление списка сохраненных платежных методов
    function updateSavedPayments() {
        const savedPaymentsList = document.getElementById("saved-payments");
        savedPaymentsList.innerHTML = '';
        savedPayments.forEach(payment => {
            const listItem = document.createElement("li");
            listItem.textContent = payment;
            savedPaymentsList.appendChild(listItem);
        });
    }

    // ============ Работа с адресами ============
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
        attachRemoveEvent();
    }

    function attachRemoveEvent() {
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
});

// Открытие официального сайта PayPal в новой вкладке
window.addPayPal = () => {
    window.open("https://www.paypal.com", "_blank");
};

// Назначаем обработчики событий на изображения (карта и PayPal)
document.getElementById("add-card").addEventListener("click", showCardForm);
document.getElementById("add-paypal").addEventListener("click", addPayPal);

document.addEventListener("DOMContentLoaded", () => {
    const orders = []; // Тут поки що пусто
  
    const ordersList = document.getElementById("orders-list");
    const noOrders = document.getElementById("no-orders");
  
    if (orders.length === 0) {
      // Показываем "No orders yet"
      noOrders.style.display = "block";
      ordersList.style.display = "none";
    } else {
      // Показываем заказы
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
  });
  