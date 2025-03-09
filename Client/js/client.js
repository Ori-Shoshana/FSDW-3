function addWorkout() {
    let name = document.getElementById("workout-name").value;
    let duration = document.getElementById("workout-duration").value;
    let intensity = document.getElementById("workout-intensity").value;
    let image = document.getElementById("workout-image").value;
    let category = Array.from(document.querySelectorAll("#workout-category input[name='categories']:checked"))
        .map(checkbox => checkbox.value);

    if (!name) return;

    const request = new FXMLHttpRequest();
    request.open('POST', '/api/workouts', true);

    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 201 || response.status === 200) {
            alert('Workout added successfully');
            loadWorkouts();
        } else {
            alert('Error adding workout');
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

    document.getElementById("workout-name").value = "";
    document.getElementById("workout-duration").value = "";
    document.getElementById("workout-intensity").value = "";
    document.getElementById("workout-image").value = "";
    document.querySelectorAll("#workout-category input[name='categories']:checked")
        .forEach(checkbox => checkbox.checked = false);
}

function deleteWorkout(id) {
    const request = new FXMLHttpRequest();
    request.open('DELETE', `/api/workouts/${id}`, true);
    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 201 || response.status === 200) {    
            alert('Workout deleted successfully');
            loadWorkouts();
        } else {
            alert('Error deleting workout');
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
        if (response.status === 201 || response.status === 200) {
            const workoutsList = document.getElementById('workout-list');
            workoutsList.innerHTML = '';
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
            alert('Workouts loaded successfully');
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

function editWorkout(id) {
    const request = new FXMLHttpRequest();
    request.open('GET', `/api/workouts/${id}`, true);
    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 201 || response.status === 200) {
            const workout = response.message;
            document.getElementById("workout-name").value = workout.name;
            document.getElementById("workout-duration").value = workout.duration;
            document.getElementById("workout-intensity").value = workout.intensity;
            document.getElementById("workout-image").value = workout.image;
            workout.category.forEach(category => {
                document.getElementById(`category-${category}`).checked = true;
            });
            alert('Workout loaded successfully');
        } else {
            alert('Error loading workout');
        }
    };
    request.send();
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('currentUser')) {
        navigateTo('dashboardPage');
    } else {
        navigateTo('loginPage');
    }
    loadWorkouts();
});