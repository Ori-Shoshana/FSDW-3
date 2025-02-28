document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");
    const links = document.querySelectorAll("nav a");

    function loadPage(page) {
        const template = document.getElementById(page);
        if (template) {
            mainContent.innerHTML = template.innerHTML;
            if (page === "login") attachLoginEvents();
            if (page === "register") attachRegisterEvents();
        } else {
            mainContent.innerHTML = "<h1>Page not found</h1>";
        }
    }

    function attachLoginEvents() {
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        const loginButton = document.getElementById("loginButton");
        const form = document.getElementById("loginForm");
        
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = usernameInput.value;
            const password = passwordInput.value;
            
            const response = await fajax({ method: "POST", url: "/login", data: { username, password } });
            if (response.success) {
                localStorage.setItem("currentUser", username);
                loadPage("home");
            } else {
                alert(response.message);
            }
        });
    }

    function attachRegisterEvents() {
        const form = document.getElementById("registerForm");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            const response = await fajax({ method: "POST", url: "/register", data });
            if (response.success) {
                alert("Registration successful! You can now log in.");
                loadPage("login");
            } else {
                alert(response.message);
            }
        });
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
