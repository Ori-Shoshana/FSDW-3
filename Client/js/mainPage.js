document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.sidebar nav a');

    function loadContent(page) {
        let content = '';

        switch (page) {
            case 'home':
                content = `
                    <section class="home">
                        <h1>Home</h1>
                        <div class="workout-summary">
                            <h2>sapirb</h2>
                            <p class="date">4 Dec 2024, 19:33</p>
                            <h3>Full body back</h3>
                            <p>Duration: 55min</p>
                            <p>Volume: 5,324 kg</p>
                        </div>
                        <div class="workout-details">
                            <h3>Workout</h3>
                            <ul>
                                <li>3 sets Pull Up (Assisted)</li>
                                <li>3 sets Dumbbell Row</li>
                                <li>2 sets Rear Delt Reverse Fly (Machine)</li>
                                <li><a href="#">See 4 more exercises</a></li>
                            </ul>
                        </div>
                        <div class="comment-section">
                            <input type="text" placeholder="Write a comment...">
                            <button>Post</button>
                        </div>
                    </section>
                `;
                break;
            case 'profile':
                content = `
                    <section class="profile">
                        <h1>Profile</h1>
                        <p>User profile information...</p>
                    </section>
                `;
                break;
            case 'routines':
                content = `
                    <section class="routines">
                        <h1>Routines</h1>
                        <p>Workout routines...</p>
                    </section>
                `;
                break;
              case 'exercises':
                content = `
                    <section class="exercises">
                        <h1>Exercises</h1>
                        <p>Exercises details...</p>
                    </section>
                `;
                break;
            case 'settings':
                content = `
                    <section class="settings">
                        <h1>Settings</h1>
                        <p>Settings page content...</p>
                    </section>
                `;
                break;
            default:
                content = '<h1>Page Not Found</h1>';
        }

        mainContent.innerHTML = content;
    }

    // Initial content load (e.g., load the home page by default)
    loadContent('home');

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior (page reload)
            const page = this.dataset.page; // Get the value of the data-page attribute
            loadContent(page);
        });
    });
});
