document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.querySelector('.login');
    const signupBtn = document.querySelector('.signup');
    const logoutBtn = document.querySelector('#logout');
    const authButtons = document.querySelector('.auth-buttons');
    const profileIcon = document.querySelector('.profile-icon');
    const themeSwitch = document.getElementById("themeSwitch");
    const body = document.body;


    let isLoggedIn = localStorage.getItem('loggedIn') === 'true';


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

    updateAuthUI();

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
});