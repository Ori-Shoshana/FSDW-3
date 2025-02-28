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
            alert('האימון נוסף בהצלחה!');
            loadWorkouts();
        } else {
            alert('שגיאה בהוספת האימון.');
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
            alert('האימון נמחק בהצלחה');
            loadWorkouts();
        } else {
            alert('שגיאה בעת מחיקת האימון');
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
                <p>משך אימון: ${workout.duration} דקות</p>
                <p>עצימות: ${workout.intensity}</p>
                <button onclick="deleteWorkout('${workout.id}')">מחק</button>
                <button onclick="editWorkout('${workout.id}')">עדכן</button>
            `;

            alert('האימון נטען בהצלחה');
        } else {
            alert('שגיאה בעת טעינת האימון');
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
                    <p>משך אימון: ${workout.duration} דקות</p>
                    <p>עצימות: ${workout.intensity}</p>
                    <button onclick="deleteWorkout('${workout.id}')">מחק</button>
                    <button onclick="editWorkout('${workout.id}')">עדכן</button>
                    <button onclick="getWorkout('${workout.id}')">הצגת בלעדית</button>
                `;
                workoutsList.appendChild(workoutCard);
            });
            alert('האימונים נטענו בהצלחה');
        } else {
            alert('שגיאה בעת טעינת האימונים.');
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
                name: "HIIT אימון אינטנסיבי",
                duration: 30,
                intensity: "גבוהה",
                image: "https://example.com/hiit.jpg",
                category: ["אירובי", "שריפת שומן"],
                id: id,
            },
            {
                name: "אימון כוח",
                duration: 45,
                intensity: "בינונית",
                image: "https://example.com/strength.jpg",
                category: ["כוח", "משקולות"],
                id: id + 1,
            },
            {
                name: "יוגה מרגיעה",
                duration: 60,
                intensity: "נמוכה",
                image: "https://example.com/yoga.jpg",
                category: ["גמישות", "הרפיה"],
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
                    <p>משך אימון: ${workout.duration} דקות</p>
                    <p>עצימות: ${workout.intensity}</p>
                    <button onclick="deleteWorkout('${workout.id}')">מחק</button>
                    <button onclick="getWorkout('${workout.id}')">הצגת בלעדית</button>
                `;
                workoutsList.appendChild(workoutCard);
            });
            alert('האימונים נטענו בהצלחה');
        } else {
            alert('שגיאה בעת טעינת האימונים.');
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
