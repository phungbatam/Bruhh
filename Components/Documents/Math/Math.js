async function fetchDocumentsByClass(className) {
    const directories = {
        'Ten': "class/Ten",
        'Eleven': "class/Eleven",
        'Twelve': "class/Twelve"
    };

    const selectedClass = directories[className];
    const allDocuments = [];

    try {
        const response = await fetch(selectedClass);
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const links = Array.from(doc.querySelectorAll("a"))
            .map(a => a.href)
            .filter(href => href.endsWith(".pdf") || href.endsWith(".docx")); // Thêm điều kiện cho .docx

        allDocuments.push(...links.map(file => ({
            title: formatTitle(file),
            file: file
        })));
    } catch (error) {
        console.error(`Lỗi khi lấy danh sách file từ thư mục ${selectedClass}:`, error);
    }

    return allDocuments;
}

// Hàm format tiêu đề tài liệu
function formatTitle(filename) {
    return decodeURIComponent(filename.split("/").pop().replace(".pdf", "").replace(/_/g, " "));
}

// Hàm load tài liệu theo lớp học
async function loadDocumentsForClass(className) {
    const documents = await fetchDocumentsByClass(className);
    window.allDocuments = documents;
    window.currentClass = className;  // Cập nhật lớp học hiện tại
    const docList = document.getElementById("docList");
    docList.innerHTML = "";

    documents.forEach(doc => {
        const docCard = createDocCard(doc);
        docList.appendChild(docCard);
    });
}

// Hàm tạo thẻ tài liệu
function createDocCard(doc) {
    const docCard = document.createElement("div");
    docCard.className = "doc-card";

    // Canvas để hiển thị ảnh preview
    const canvas = document.createElement("canvas");
    canvas.className = "preview-img";
    canvas.setAttribute("data-src", doc.file);
    canvas.onclick = () => openPreview(doc.file); // Mở ảnh khi nhấn

    const title = document.createElement("h3");
    title.textContent = doc.title;
    title.onclick = () => openPreview(doc.file); // Thêm sự kiện click vào tên tài liệu để mở preview

    const link = document.createElement("a");
    link.textContent = "📥 Tải xuống";
    link.href = doc.file;
    link.className = "download-btn";
    link.setAttribute("download", doc.file);

    docCard.appendChild(canvas);
    docCard.appendChild(title);
    docCard.appendChild(link);

    loadPreviewImage(canvas); // Gọi hàm render ảnh xem trước

    return docCard;
}

// Hàm tải ảnh preview cho tài liệu
function loadPreviewImage(canvas, file) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const filePath = entry.target.getAttribute("data-src");

                // Kiểm tra nếu là .pdf hay .docx để xử lý khác nhau
                if (filePath.endsWith('.pdf')) {
                    generatePreview(filePath, entry.target); // Render PDF vào canvas
                } else if (filePath.endsWith('.docx')) {
                    // Hiển thị hình ảnh mặc định cho .docx từ URL mặc định
                    const context = entry.target.getContext("2d");
                    const img = new Image();
                    img.onload = function () {
                        context.drawImage(img, 0, 0, entry.target.width, entry.target.height);
                    };
                    img.src = 'https://w7.pngwing.com/pngs/854/300/png-transparent-microsoft-word-microsoft-office-2016-microsoft-excel-microsoft-template-blue-angle.png';  // Thay bằng URL của hình ảnh mặc định cho .docx
                }

                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "100px" });

    observer.observe(canvas);
}

// Hàm tạo preview ảnh từ file PDF
function generatePreview(pdfPath, canvasElement) {
    pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
        pdf.getPage(1).then(page => {
            const viewport = page.getViewport({ scale: 0.3 });
            const context = canvasElement.getContext("2d");
            canvasElement.height = viewport.height;
            canvasElement.width = viewport.width;
            page.render({ canvasContext: context, viewport: viewport });
        });
    }).catch(error => {
        console.error("Không thể tải bản xem trước PDF:", error);
    });
}

// Hàm mở ảnh trong lightbox (phóng to ảnh PDF hoặc hình ảnh)
function openPreview(filePath) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCanvas = document.getElementById('lightboxCanvas'); // Canvas cho PDF

    // Kiểm tra xem tài liệu là PDF hay là hình ảnh
    if (filePath.endsWith('.pdf')) {
        lightboxImage.style.display = 'none'; // Ẩn image nếu là PDF
        lightboxCanvas.style.display = 'block'; // Hiển thị canvas nếu là PDF
        generatePreview(filePath, lightboxCanvas); // Render PDF vào canvas
    } else {
        lightboxCanvas.style.display = 'none'; // Ẩn canvas nếu là ảnh
        lightboxImage.style.display = 'block'; // Hiển thị image nếu là ảnh
        lightboxImage.src = filePath; // Cập nhật src của ảnh
    }

    lightbox.classList.add('active'); // Hiển thị lightbox
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

function delaySearch() {
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(filterDocs, 300);  // Delay tìm kiếm để tránh quá tải
}

function filterDocs() {
    const searchQuery = document.getElementById("search").value.toLowerCase();

    if (searchQuery.length === 0) {
        loadDocumentsForClass(window.currentClass);  // Nếu không có từ khóa, load lại tất cả tài liệu
        return;
    }

    const filteredDocs = window.allDocuments.filter(doc => doc.title.toLowerCase().includes(searchQuery));

    const docList = document.getElementById("docList");
    docList.innerHTML = ""; // Xóa danh sách cũ

    filteredDocs.forEach(doc => {
        const docCard = createDocCard(doc);
        docList.appendChild(docCard);
    });
}

// Hàm lọc tài liệu theo lớp học
function filterByClass(className) {
    loadDocumentsForClass(className);  // Lọc tài liệu theo lớp học
}

// Gọi hàm load tài liệu cho lớp học mặc định khi trang tải
document.addEventListener("DOMContentLoaded", () => {
    loadDocumentsForClass("Ten");  // Tải tài liệu lớp "Ten" mặc định
});
