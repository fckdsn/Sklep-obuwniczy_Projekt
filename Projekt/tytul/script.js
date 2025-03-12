document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('themeSwitch');
    const body = document.body;

    // Перевіряємо тему в localStorage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.remove('dark-theme');
        themeSwitch.textContent = '🌙 Dark Mode';
    } else {
        body.classList.add('dark-theme');
        themeSwitch.textContent = '☀️ Light Mode';
    }

    themeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark-theme');

        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeSwitch.textContent = '☀️ Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeSwitch.textContent = '🌙 Dark Mode';
        }
    });
});
