// פונקציה להחלפת תצוגת דפים ב-SPA
function navigateTo(section) {
    const page = document.getElementById(section);
    if (!page) {
        console.error(`Error: Page '${section}' not found.`);
        return;
    }

    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    page.classList.remove("hidden");

    if (section === "dashboardPage") {
        loadDashboardWorkouts(); // Load workouts into the dashboard
    } else if (section === "workoutManagementPage") {
        loadWorkouts(); // Load workouts into the management page
    }
}

// פונקציה לעדכון הודעה למשתמש
function updateMessage(messageElement, message) {
    messageElement.innerHTML = message;
    messageElement.style.display = "block";
}

// פונקציה לרישום משתמשים
function registerUser(event) {
    event.preventDefault();

    const username = document.querySelector("#signup-form input[placeholder='Username']").value;
    const email = document.querySelector("#signup-form input[placeholder='Email']").value;
    const password = document.querySelector("#signup-form input[placeholder='Password']").value;
    const age = document.querySelector("#signup-form input[placeholder='Enter your age']").value;
    const gender = document.querySelector("#gender-toggle").checked ? "Female" : "Male";
    const fitnessGoal = document.querySelector("#signup-form select[name='fitnessGoal']").value;
    const membershipType = document.querySelector("#signup-form select[name='membershipType']").value;

    const requestData = { username, email, password, age, gender, fitnessGoal, membershipType };

    const xhr = new FXMLHttpRequest();
    xhr.open("POST", "/api/auth/register");
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && response.success) {
            localStorage.setItem("currentUser", response.username);
            alert("Registration successful! Redirecting...");
            navigateTo("dashboardPage");
        } else {
            alert(response.message);
        }
    };
    xhr.send(JSON.stringify(requestData));
}


function loginUser(event) {
    event.preventDefault();

    const username = document.querySelector("#loginPage input[placeholder='Username']").value;
    const password = document.querySelector("#loginPage input[placeholder='Password']").value;
    const messageElement = document.getElementById("login-message");

    const requestData = { username, password };

    const xhr = new FXMLHttpRequest();
    xhr.open("POST", "/api/auth/login");
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);

        if (xhr.status === 403 && response.remainingTime) {
            handleLoginResponse(response);
        } else if (xhr.status === 200 && response.success) {
            localStorage.setItem("currentUser", response.username); // Store the username as userId

            // Clear the workoutsGrid immediately
            const workoutsGrid = document.getElementById('workoutsGrid');
            workoutsGrid.innerHTML = '';

            messageElement.style.display = "none";
            navigateTo('dashboardPage');
        } else {
            updateMessage(messageElement, response.message);
        }
    };
    xhr.send(JSON.stringify(requestData));
}

// פונקציה שמעדכנת את המשתמש על הזמן שנותר לנעילה
function handleLoginResponse(response) {
    if (response.status === 403 && response.remainingTime) {
        let remainingTime = response.remainingTime;
        
        document.getElementById("login-message").innerText = `User locked. Try again in ${remainingTime} seconds.`;

        const countdown = setInterval(() => {
            remainingTime--;
            document.getElementById("login-message").innerText = `User locked. Try again in ${remainingTime} seconds.`;

            if (remainingTime <= 0) {
                clearInterval(countdown);
                document.getElementById("login-message").innerText = "You can try logging in now.";
            }
        }, 1000);
    }
}

// פונקציה להתנתקות משתמשים
function logoutUser() {
    const xhr = new FXMLHttpRequest();
    xhr.open("POST", "/api/auth/logout");
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && response.success) {
            localStorage.removeItem("currentUser");

            // Clear the workoutsGrid immediately
            const workoutsGrid = document.getElementById('workoutsGrid');
            workoutsGrid.innerHTML = '';

            navigateTo("loginPage");
        } else {
            alert("Logout failed. Please try again.");
        }
    };
    xhr.send();
}


function addWorkoutToList(workout) {
    const template = document.getElementById('workout-template').content.cloneNode(true);
    template.querySelector('.workout-name').textContent = workout.name;
    template.querySelector('.workout-duration').textContent = `Duration: ${workout.duration} minutes`;
    template.querySelector('.workout-intensity').textContent = `Intensity: ${workout.intensity}`;
    template.querySelector('.workout-image').src = workout.image;
    
    const categoriesContainer = template.querySelector('.workout-categories');
    workout.categories.forEach(category => {
        const categorySpan = document.createElement('span');
        categorySpan.textContent = category;
        categoriesContainer.appendChild(categorySpan);
    });
    
    // Append the workout to the dashboardPage container
    document.getElementById('workoutsGrid').appendChild(template);
}

// מחכה לטעינת העמוד ומגדיר ניתוב מתאים
document.addEventListener('DOMContentLoaded', () => {
    navigateTo(location.hash.slice(1) || 'login');
});

// מאזין לשינוי כתובת ה-URL
window.addEventListener('hashchange', () => {
    navigateTo(location.hash.slice(1) || 'login');
});

document.getElementById("search-input").addEventListener("input", function() {
    searchWorkouts();
});

// אתחול דף לפי סטטוס המשתמש
document.addEventListener("DOMContentLoaded", function () {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        // Clear the workoutsGrid immediately
        const workoutsGrid = document.getElementById('workoutsGrid');
        workoutsGrid.innerHTML = '';

        navigateTo("dashboardPage");
    } else {
        navigateTo("loginPage");
    }
});