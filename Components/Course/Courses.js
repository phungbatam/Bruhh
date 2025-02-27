// Hàm băm SHA-256
async function hashCode(code) {
    const encoder = new TextEncoder();
    const data = encoder.encode(code);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
}

// Danh sách khóa học
function Courses() {
    const container = document.createElement("div");
    container.className = "courses-container";

    const heading = document.createElement("h2");
    heading.textContent = "Danh sách khóa học";

    const courseList = document.createElement("div");
    courseList.className = "course-list";

    // Mã SHA-256 của "100"
    const correctHash = "ad57366865126e55649ecb23ae1d48887544976efea46a48eb5d85a6eeb4d306";
    const HashPython = "0feb3d33ce3b3c586f6c955a6490cfdc1174464a98401fe81f4abd5f020f8b80"; // pass: @PythonCorePBT2516

    const courses = [
        { title: "HTML & CSS Basics", link: "#html-css", description: "Học nền tảng HTML & CSS để tạo website.", image: "./Components/Course/img/hc.png", hash: correctHash },
        { title: "JavaScript Mastery", link: "#javascript", description: "Nắm vững JavaScript và xây dựng ứng dụng web.", image: "./Components/Course/img/js.png", hash: HashPython },
        { title: "Python for Beginners", link: "#python", description: "Bắt đầu với Python từ cơ bản đến nâng cao.", image: "./Components/Course/img/py.jpg", hash: correctHash },
    ];

    courses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.className = "course-card";

        const image = document.createElement("img");
        image.src = course.image;
        image.alt = course.title;
        image.className = "course-image";

        const title = document.createElement("h3");
        title.textContent = course.title;

        const description = document.createElement("p");
        description.textContent = course.description;

        const button = document.createElement("button");
        button.textContent = "Xem khóa học";
        button.className = "course-button";
        button.onclick = () => requestCourseAccess(course);

        courseCard.appendChild(image);
        courseCard.appendChild(title);
        courseCard.appendChild(description);
        courseCard.appendChild(button);
        courseList.appendChild(courseCard);
    });

    container.appendChild(heading);
    container.appendChild(courseList);
    return container;
}

let failedAttempts = 0;
let isLocked = false;

async function requestCourseAccess(course) {
    if (isLocked) {
        alert("⛔ Bạn đã nhập sai quá nhiều lần. Hãy thử lại sau!");
        return;
    }

    let userInput = prompt(`Nhập mã khóa học để truy cập: ${course.title}`);
    if (!userInput) return;

    userInput = userInput.trim(); // Loại bỏ khoảng trắng thừa
    const hashedInput = await hashCode(userInput);

    console.log(`🔍 Hash của '${userInput}':`, hashedInput); // Debug để kiểm tra mã băm

    if (hashedInput === course.hash) {
        alert("✅ Mã hợp lệ! Đang chuyển hướng...");
        window.location.href = course.link;
    } else {
        failedAttempts++;
        alert(`❌ Error Code: Mật khẩu không đúng! (Lần ${failedAttempts}/3)`);

        if (failedAttempts >= 3) {
            isLocked = true;
            alert("🚫 Bạn đã nhập sai 3 lần. Hãy thử lại sau 5 phút.");
            setTimeout(() => {
                isLocked = false;
                failedAttempts = 0;
            }, 5 * 60 * 1000); // 5 phút
        }
    }
}

function loadCSS() {
    if (!document.querySelector("link[href='Courses.css']")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./Components/Course/Courses.css";
        document.head.appendChild(link);
    }
}

document.addEventListener("DOMContentLoaded", loadCSS);

window.loadCourses = function () {
    loadCSS();
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(Courses());
};
