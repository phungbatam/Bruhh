function Documents() {
    const container = document.createElement("div");
    container.className = "courses-container";

    const heading = document.createElement("h2");
    heading.textContent = "Danh sách tài liệu";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "search";
    searchInput.placeholder = "🔍 Tìm kiếm tài liệu...";
    searchInput.onkeyup = filterDocs;

    const courseList = document.createElement("div");
    courseList.className = "course-list";
    courseList.id = "docList";

    const nameDOCX = ['Math', 'Physics']

    const documents = [
        { title: "JavaScript Cơ bản", link: "./Components/Documents/program/Javascript/list.html", image: "./Components/Documents/program/Javascript/js.png", description: "B001" },
        { title: "HTML & CSS Nâng Cao", link: "#", description: "Nâng cao kỹ năng HTML & CSS.", image: "./Components/Documents/hc.jpg" },
        { title: "Lập trình Python", link: "#", description: "Khóa học lập trình Python dành cho người mới bắt đầu.", image: "./Components/Documents/python.jpg" },
        { title: nameDOCX[0], link: "./Components/Documents/Math/Math.html", description: "Đây là kho tài liệu Toán học do Admin cung cấp",image: "./Components/Documents/Math/Math.jpg", description: "M0A1" },
    ];

    documents.forEach(doc => {
        const docCard = document.createElement("div");
        docCard.className = "course-card";

        const image = document.createElement("img");
        image.src = doc.image || "./default-image.png";
        image.alt = doc.title;
        image.className = "course-image";

        const title = document.createElement("h3");
        title.textContent = doc.title;

        const description = document.createElement("p");
        description.textContent = doc.description;

        const link = document.createElement("a");
        link.textContent = "Download";
        link.href = doc.link;
        link.className = "course-button";

        docCard.appendChild(image);
        docCard.appendChild(title);
        docCard.appendChild(description);
        docCard.appendChild(link);
        courseList.appendChild(docCard);
    });

    container.appendChild(heading);
    container.appendChild(searchInput);
    container.appendChild(courseList);
    return container;
}

window.loadDocs = function () {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(Documents());
    loadCSS();
};

function loadCSS() {
    if (!document.querySelector("link[href='Documents.css']")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./Components/Documents/Documents.css";
        document.head.appendChild(link);
    }
}

window.filterDocs = function () {
    const query = document.getElementById("search").value.toLowerCase();
    const items = document.querySelectorAll(".course-card");
    items.forEach(item => {
        const text = item.querySelector("h3").textContent.toLowerCase();
        item.style.display = text.includes(query) ? "block" : "none";
    });
};