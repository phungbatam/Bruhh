const documents = [
    { title: "JavaScript Cơ Bản", image: "js.png", description: "Học JavaScript từ cơ bản đến nâng cao.", link: "" },
    { title: "JavaScript Nâng Cao", image: "js_advanced.png", description: "Cách tối ưu mã JavaScript hiệu quả.", link: "docs/javascript_advanced.pdf" },
    { title: "ES6+ Features", image: "es6.png", description: "Khám phá các tính năng mới trong ES6 và hơn thế nữa.", link: "docs/es6.pdf" },
    { title: "Lập trình JavaScript với DOM", image: "dom.png", description: "Hướng dẫn thao tác DOM bằng JavaScript.", link: "docs/javascript_dom.pdf" },
    
];

function loadDocuments() {
    const docList = document.getElementById("docList");
    docList.innerHTML = "";  

    documents.forEach(doc => {
        const docCard = document.createElement("div");
        docCard.className = "doc-card";

        const image = document.createElement("img");
        image.src = `images/${doc.image}`;
        image.alt = doc.title;

        const title = document.createElement("h3");
        title.textContent = doc.title;

        const description = document.createElement("p");
        description.textContent = doc.description;

        const link = document.createElement("a");
        link.textContent = "📥 Tải xuống";
        link.href = doc.link;
        link.className = "download-btn";
        link.setAttribute("download", doc.link);

        docCard.appendChild(image);
        docCard.appendChild(title);
        docCard.appendChild(description);
        docCard.appendChild(link);
        docList.appendChild(docCard);
    });
}

function filterDocs() {
    const query = document.getElementById("search").value.toLowerCase();
    const items = document.querySelectorAll(".doc-card");

    items.forEach(item => {
        const text = item.querySelector("h3").textContent.toLowerCase();
        item.style.display = text.includes(query) ? "block" : "none";
    });
}

// Load tài liệu khi trang tải xong
document.addEventListener("DOMContentLoaded", loadDocuments);