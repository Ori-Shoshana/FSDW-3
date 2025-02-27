document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");
    const links = document.querySelectorAll("nav a");

    function loadPage(page) {
        const template = document.getElementById(page);
        if (template) {
            mainContent.innerHTML = template.innerHTML;
        } else {
            mainContent.innerHTML = "<h1>Page not found</h1>";
        }
    }

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const page = link.getAttribute("data-page");
            history.pushState({ page }, "", `#${page}`);
            loadPage(page);
        });
    });

    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.page) {
            loadPage(event.state.page);
        }
    });

    // טעינת עמוד ראשוני
    const initialPage = location.hash.replace("#", "") || "login";
    loadPage(initialPage);
});
