document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector('.login');
    const signupBtn = document.querySelector('.signup');
    const logoutBtn = document.querySelector('#logout');
    const authButtons = document.querySelector('.auth-buttons');
    const profileIcon = document.querySelector('.profile-icon');
    const themeSwitch = document.getElementById("themeSwitch");
    const body = document.body;

    let isLoggedIn = localStorage.getItem('loggedIn') === 'true';

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

    // Перемикання теми
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-theme");
        themeSwitch.textContent = "🌙 Dark Mode";
    }

    themeSwitch?.addEventListener("click", () => {
        body.classList.toggle("light-theme");

        if (body.classList.contains("light-theme")) {
            localStorage.setItem("theme", "light");
            themeSwitch.textContent = "🌙 Dark Mode";
        } else {
            localStorage.setItem("theme", "dark");
            themeSwitch.textContent = "☀ Light Mode";
        }
    });

    // Підсвічування активного пункту меню
    const currentPath = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.menu-link');

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.parentElement.classList.add('active');
        }
    });
});
