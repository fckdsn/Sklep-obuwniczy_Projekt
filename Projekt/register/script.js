function switchTab(tab) {
    if (tab === "signup") {
        window.location.href = "signup.html";
    } else {
        window.location.href = "login.html";
    }
}

function redirectToHome(event) {
    event.preventDefault();
    window.location.href = "../tytul/index.html";
}
