function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");

    document.addEventListener("click", function(event) {
        if (!menu.contains(event.target) && !event.target.classList.contains("menu-toggle")) {
            menu.classList.remove("active");
        }
    }, { once: true }); 
}

function closeMenu() {
    document.querySelector(".menu").classList.remove("active");
}

function toggleSubMenu() {
    const submenu = document.getElementById("coursesSubMenu");
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

// Đóng submenu khi click bên ngoài
document.addEventListener("click", function (event) {
    const submenu = document.getElementById("coursesSubMenu");
    const button = document.querySelector(".btn");

    if (!submenu.contains(event.target) && !button.contains(event.target)) {
        submenu.style.display = "none";
    }
});

