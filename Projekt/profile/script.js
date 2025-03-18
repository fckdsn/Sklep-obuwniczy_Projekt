document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector('.login');
    const signupBtn = document.querySelector('.signup');
    const logoutBtn = document.querySelector('#logout');
    const authButtons = document.querySelector('.auth-buttons');
    const profileIcon = document.querySelector('.profile-icon');
    const menuLinks = document.querySelectorAll('.menu-link');
    const tabContents = document.querySelectorAll('.tab-content');

    let isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const sellingItems = [];
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

    window.addSellingItem = () => {
        const name = document.getElementById('item-name').value;
        const price = document.getElementById('item-price').value;
        const description = document.getElementById('item-description').value;

        if (name && price && description) {
            const newItem = { name, price, description };
            sellingItems.push(newItem);
            updateSellingItems();
            clearSellingForm();
            showSuccessMessage("Item added");
        } else {
            alert('Please fill in all fields.');
        }
    };

    function showSuccessMessage(message) {
        let existingMsg = document.querySelector('.success-message');
        if (existingMsg) existingMsg.remove();

        const msgDiv = document.createElement('div');
        msgDiv.classList.add('success-message');
        msgDiv.textContent = message;
        document.body.appendChild(msgDiv);

        setTimeout(() => {
            msgDiv.remove();
        }, 3000);
    }

    function updateSellingItems() {
        const sellingItemsDiv = document.getElementById('selling-items');
        sellingItemsDiv.innerHTML = '';

        if (sellingItems.length === 0) {
            sellingItemsDiv.innerHTML = '<p>No items listed for sale.</p>';
        } else {
            sellingItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('selling-item');
                itemDiv.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price}</p>
                    <p>Description: ${item.description}</p>
                    <button onclick="removeSellingItem(${index})">Remove</button>
                `;
                sellingItemsDiv.appendChild(itemDiv);
            });
        }
    }

    window.removeSellingItem = (index) => {
        sellingItems.splice(index, 1);
        updateSellingItems();
    };

    
    function clearSellingForm() {
        document.getElementById('item-name').value = '';
        document.getElementById('item-price').value = '';
        document.getElementById('item-description').value = '';
    }

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

});

// Открытие официального сайта PayPal в новой вкладке
window.addPayPal = () => {
    window.open("https://www.paypal.com", "_blank");
};

// Назначаем обработчики событий на изображения (карта и PayPal)
document.getElementById("add-card").addEventListener("click", showCardForm);
document.getElementById("add-paypal").addEventListener("click", addPayPal);


