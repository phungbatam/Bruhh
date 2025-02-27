function loadMarkdown(container, title, filePath) {
    const card = document.createElement("div");
    card.className = "markdown-card";

    const heading = document.createElement("h2");
    heading.className = "markdown-title";
    heading.textContent = title;

    const content = document.createElement("div");
    content.className = "markdown-content";
    content.innerHTML = "<p>Loading content...</p>";

    fetch(filePath)
        .then(response => response.text())
        .then(markdown => {
            if (typeof marked !== "undefined") {
                content.innerHTML = marked.parse(markdown);
                hljs.highlightAll();
            } else {
                content.innerHTML = "<p>Error: marked.js is not loaded.</p>";
                console.error("marked.js not found.");
            }
        })
        .catch(error => {
            content.innerHTML = "<p>Error loading content.</p>";
            console.error("Error loading content:", error);
        });

    card.appendChild(heading);
    card.appendChild(content);

    container.appendChild(card);
}

function Home() {
    const container = document.createElement("div");
    container.className = "home-layout"; // Updated class for flex layout

    // Main content area
    const contentContainer = document.createElement("div");
    contentContainer.className = "markdown-feed"; 

    // Sidebar container
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";
    sidebar.innerHTML = "<h3>Danh mục bài viết</h3>"; // Sidebar title

    // List of markdown files
    const markdownFiles = [
        { title: "Giới thiệu", file: "./Components/Home/Content/Intro.md" },
        { title: "Bài viết đầu tiên ", file: "./Components/Home/Content/Another.md" },
        // { title: "Bài viết 2", file: "./Components/Home/Content/Article.md" }
    ];

    // Create article links in the sidebar
    const articleList = document.createElement("ul");
    articleList.className = "article-list";

    markdownFiles.forEach(({ title, file }) => {
        // Load markdown into the main content
        loadMarkdown(contentContainer, title, file);

        // Create sidebar links
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#"; // Prevent default behavior
        link.textContent = title;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            contentContainer.innerHTML = ""; // Clear previous content
            loadMarkdown(contentContainer, title, file);
        });

        listItem.appendChild(link);
        articleList.appendChild(listItem);
    });

    sidebar.appendChild(articleList);

    // Append sidebar and content container to the main layout
    container.appendChild(contentContainer);
    container.appendChild(sidebar);

    return container;
}


function loadHomeCSS() {
    if (!document.getElementById("home-css")) {
        const link = document.createElement("link");
        link.id = "home-css";
        link.rel = "stylesheet";
        link.href = "./Components/Home/Home.css";
        document.head.appendChild(link);
    }

    if (!document.getElementById("markdown-css")) {
        const markdownLink = document.createElement("link");
        markdownLink.id = "markdown-css";
        markdownLink.rel = "stylesheet";
        markdownLink.href = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css";
        document.head.appendChild(markdownLink);
    }
}

window.loadHome = function () {
    loadHomeCSS();
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(Home());
};
