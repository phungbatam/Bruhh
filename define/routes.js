const routes = {
    Home: () => loadHome(),
    Courses: () => loadCourses(),
    Documents: () => loadDocs(),
    about: () => loadAbout()
};

function navigate(page) {
    if (routes[page]) {
        routes[page](); // Gọi hàm tương ứng với trang
    } else {
        document.getElementById('app').innerHTML = '<h1>Page not found</h1>';
    }
}

// Load trang mặc định (Home)
document.addEventListener("DOMContentLoaded", () => navigate('Home'));
