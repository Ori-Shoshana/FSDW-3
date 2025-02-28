const Server = {
    handleRequest: (method, url, data, callback) => {
        const id = url.split('/').pop();
        if (method === 'GET' && id === "workouts") { // שליפת כל האימונים
            const workouts = Database.getWorkouts();
            callback({ status: 200, message: workouts });
        } else if (method === 'GET' && id > 0) { // שליפת אימון מסוים
            const workout = Database.getWorkout(id);
            callback({ status: 200, message: workout });
        } else if (method === 'POST') { // הוספת אימון חדש
            const workout = JSON.parse(data);
            Database.addWorkout(workout);
            callback({ status: 201, message: 'Workout added successfully' });
        } else if (method === 'PUT') { // עדכון אימון
            const workout = JSON.parse(data);
            Database.editWorkout(id, workout);
            callback({ status: 200, message: 'Workout updated successfully' });
        } else if (method === 'DELETE') { // מחיקת אימון
            Database.deleteWorkout(id);
            callback({ status: 200, message: 'Workout deleted successfully' });
        } else {
            callback({ status: 400, message: 'Invalid request' });
        }
    }
};
