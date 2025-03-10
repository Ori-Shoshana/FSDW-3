function addWorkout() {
    if (editingWorkoutId) {
        saveWorkout(editingWorkoutId);
        return;
    }

    let name = document.getElementById("workout-name").value;
    let duration = document.getElementById("workout-duration").value;
    let intensity = document.getElementById("workout-intensity").value;
    let image = document.getElementById("workout-image").value;
    let category = Array.from(document.querySelectorAll("#workout-category input[name='categories']:checked"))
        .map(checkbox => checkbox.value);

    if (!name) return;

    const currentUser = localStorage.getItem("currentUser"); // Get the logged-in user
    if (!currentUser) {
        alert("You must be logged in to add a workout.");
        return;
    }

    const request = new FXMLHttpRequest();
    request.open('POST', '/api/workouts', true);

    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 201 || response.status === 200) {
            alert('Workout added successfully');
            resetWorkoutForm();
            navigateTo('dashboardPage');
            loadDashboardWorkouts();
        } else {
            alert('Error adding workout');
        }
    };

    const workoutData = JSON.stringify({
        name: name,
        duration: duration,
        intensity: intensity,
        image: image,
        category: category,
        userId: currentUser // Add the userId to the workout data
    });

    request.send(workoutData);
}

function deleteWorkout(id) {
    const request = new FXMLHttpRequest();
    request.open('DELETE', `/api/workouts/${id}`, true);
    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 200 || response.status === 201) {
            alert('Workout deleted successfully');
            
            // Refresh both pages after deletion
            loadWorkouts(); // Refresh the workoutManagementPage
            loadDashboardWorkouts(); // Refresh the dashboardPage
        } else {
            alert('Error deleting workout');
        }
    };
    request.send();
}

function loadDashboardWorkouts() {
    const currentUser = localStorage.getItem("currentUser");
    console.log("Current User:", currentUser); // Log the current user

    if (!currentUser) {
        alert("You must be logged in to view workouts.");
        return;
    }

    const request = new FXMLHttpRequest();
    request.open('GET', '/api/workouts', true);

    request.onload = function() {
        const response = JSON.parse(request.responseText);
        console.log("All Workouts:", response.message); // Log all workouts

        if (response.status === 200 || response.status === 201) {
            const workoutsGrid = document.getElementById('workoutsGrid');
            workoutsGrid.innerHTML = '';

            // Filter workouts by userId
            const userWorkouts = response.message.filter(workout => workout.userId === currentUser);
            console.log("Filtered Workouts:", userWorkouts); // Log filtered workouts

            userWorkouts.forEach(workout => {
                const template = document.getElementById('workout-template').content.cloneNode(true);
                template.querySelector('.workout-name').textContent = workout.name;
                template.querySelector('.workout-duration').textContent = `Duration: ${workout.duration} minutes`;
                template.querySelector('.workout-intensity').textContent = `Intensity: ${workout.intensity}`;
                template.querySelector('.workout-image').src = workout.image;

                const categoriesContainer = template.querySelector('.workout-categories');
                workout.category.forEach(category => {
                    const categorySpan = document.createElement('span');
                    categorySpan.textContent = category;
                    categoriesContainer.appendChild(categorySpan);
                });

                const deleteButton = template.querySelector('.delete-button');
                deleteButton.onclick = () => deleteWorkout(workout.id);

                const editButton = template.querySelector('.edit-button');
                editButton.onclick = () => editWorkout(workout.id);

                workoutsGrid.appendChild(template);
            });
        } else {
            alert('Error loading workouts');
        }
    };

    request.send();
}

function getWorkout(id) {
    const request = new FXMLHttpRequest();
    request.open('GET', `/api/workouts/${id}`, true);
    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 201 || response.status === 200) {    
            const workout = response.message;
            const workoutsList = document.getElementById('workout-list');
            workoutsList.className = 'workout-card';
            workoutsList.innerHTML = `            
                <h2>${workout.name}</h2>
                <p>Duration: ${workout.duration} minutes</p>
                <p>Intensity: ${workout.intensity}</p>
                <button onclick="deleteWorkout('${workout.id}')">Delete</button>
                <button onclick="editWorkout('${workout.id}')">Edit</button>
            `;

            alert('Workout loaded successfully');
        } else {
            alert('Error loading workout');
        }
    };
    request.send();
}

function loadWorkouts() {
    const request = new FXMLHttpRequest();
    request.open('GET', '/api/workouts', true);
    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 200 || response.status === 201) {
            const workoutsList = document.getElementById('workout-list');
            workoutsList.innerHTML = ''; // Clear the existing workouts

            response.message.forEach(workout => {
                const workoutCard = document.createElement('div');
                workoutCard.className = 'workout-card';
                workoutCard.innerHTML = `
                    <h3>${workout.name}</h3>
                    <p>Duration: ${workout.duration} minutes</p>
                    <p>Intensity: ${workout.intensity}</p>
                    <button onclick="deleteWorkout('${workout.id}')">Delete</button>
                    <button onclick="editWorkout('${workout.id}')">Edit</button>
                `;
                workoutsList.appendChild(workoutCard);
            });
        } else {
            alert('Error loading workouts');
        }
    };
    request.send();
}

function uploadWorkouts() {
    const isWorkoutsEmpty = localStorage.getItem("workouts");
    if (!isWorkoutsEmpty) {
        const id = Date.now().toString();
        const workouts = [
            {
                name: "HIIT Intensive Workout",
                duration: 30,
                intensity: "High",
                image: "https://example.com/hiit.jpg",
                category: ["Cardio", "Fat Burning"],
                id: id,
            },
            {
                name: "Strength Training",
                duration: 45,
                intensity: "Medium",
                image: "https://example.com/strength.jpg",
                category: ["Strength", "Weights"],
                id: id + 1,
            },
            {
                name: "Relaxing Yoga",
                duration: 60,
                intensity: "Low",
                image: "https://example.com/yoga.jpg",
                category: ["Flexibility", "Relaxation"],
                id: id + 2,
            }
        ];
        localStorage.setItem("workouts", JSON.stringify(workouts));
    }

    const request = new FXMLHttpRequest();
    request.open('GET', '/api/workouts', true);
    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 201 || response.status === 200) {
            const workoutsList = document.getElementById('workout-list');
            workoutsList.innerHTML = '';
            response.message.forEach(workout => {
                const workoutCard = document.createElement("div");
                workoutCard.classList.add("workout-card");
                workoutCard.innerHTML = `
                    <h3>${workout.name}</h3>
                    <p>Duration: ${workout.duration} minutes</p>
                    <p>Intensity: ${workout.intensity}</p>
                    <button onclick="deleteWorkout('${workout.id}')">Delete</button>
                    <button onclick="getWorkout('${workout.id}')">View</button>
                `;
                workoutsList.appendChild(workoutCard);
            });
            alert('Workouts loaded successfully');
        } else {
            alert('Error loading workouts');
        }
    };
    request.send();
}

let editingWorkoutId = null; // Track the ID of the workout being edited

function editWorkout(id) {
    // Navigate to the workoutManagementPage
    navigateTo('workoutManagementPage');

    // Fetch the workout data and populate the form
    const request = new FXMLHttpRequest();
    request.open('GET', `/api/workouts/${id}`, true);
    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 201 || response.status === 200) {
            const workout = response.message;

            // Populate the form fields with the workout data
            document.getElementById("workout-name").value = workout.name;
            document.getElementById("workout-duration").value = workout.duration;
            document.getElementById("workout-intensity").value = workout.intensity;
            document.getElementById("workout-image").value = workout.image;

            // Check the appropriate category checkboxes
            document.querySelectorAll("#workout-category input[name='categories']").forEach(checkbox => {
                checkbox.checked = workout.category.includes(checkbox.value);
            });

            // Change the "Add Workout" button to "Save Workout"
            const addWorkoutButton = document.querySelector("#workoutManagementPage button[onclick='addWorkout()']");
            addWorkoutButton.textContent = "Save Workout";
            addWorkoutButton.setAttribute("onclick", `saveWorkout('${workout.id}')`);

            // Store the ID of the workout being edited
            editingWorkoutId = workout.id;

            alert('Workout loaded for editing');
        } else {
            alert('Error loading workout');
        }
    };
    request.send();
}

function saveWorkout(id) {
    let name = document.getElementById("workout-name").value;
    let duration = document.getElementById("workout-duration").value;
    let intensity = document.getElementById("workout-intensity").value;
    let image = document.getElementById("workout-image").value;
    let category = Array.from(document.querySelectorAll("#workout-category input[name='categories']:checked"))
        .map(checkbox => checkbox.value);

    if (!name) return;

    const request = new FXMLHttpRequest();
    request.open('PUT', `/api/workouts/${id}`, true);

    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 201 || response.status === 200) {
            alert('Workout updated successfully');

            // Reset the form and button
            resetWorkoutForm();

            // Navigate back to the dashboardPage
            navigateTo('dashboardPage');

            // Refresh the dashboardPage
            loadDashboardWorkouts();
        } else {
            alert('Error updating workout');
        }
    };

    const workoutData = JSON.stringify({
        name: name,
        duration: duration,
        intensity: intensity,
        image: image,
        category: category
    });

    request.send(workoutData);
}

function resetWorkoutForm() {
    document.getElementById("workout-name").value = "";
    document.getElementById("workout-duration").value = "";
    document.getElementById("workout-intensity").value = "";
    document.getElementById("workout-image").value = "";
    document.querySelectorAll("#workout-category input[name='categories']:checked")
        .forEach(checkbox => checkbox.checked = false);

    // Change the "Save Workout" button back to "Add Workout"
    const addWorkoutButton = document.querySelector("#workoutManagementPage button[onclick^='saveWorkout']");
    if (addWorkoutButton) {
        addWorkoutButton.textContent = "Add Workout";
        addWorkoutButton.setAttribute("onclick", "addWorkout()");
    }

    editingWorkoutId = null; // Reset the editing ID
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('currentUser')) {
        navigateTo('dashboardPage');
    } else {
        navigateTo('loginPage');
    }
    loadWorkouts();
});