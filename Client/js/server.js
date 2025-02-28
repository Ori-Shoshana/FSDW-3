const WorkoutServer = {
    handleRequest: (method, url, data, callback) => {
        const id = url.split('/').pop();

        if (method === 'GET' && id === "workouts") { // שליפת כל האימונים
            const workouts = WorkoutsDB.getWorkouts();
            callback({ status: 201, message: workouts });

        } else if (method === 'GET' && id > 0) { // שליפת אימון לפי מזהה (ID)
            const workout = WorkoutsDB.getWorkout(id);
            callback({ status: 200, message: workout });

        } else if (method === 'POST') { // הוספת אימון חדש
            const workout = JSON.parse(data);
            WorkoutsDB.addWorkout(workout);
            callback({ status: 201, message: 'Workout added successfully' });

        } else if (method === 'PUT') { // עריכת אימון קיים
            const workout = JSON.parse(data);
            WorkoutsDB.editWorkout(workout);
            callback({ status: 201, message: 'Workout edited successfully' });

        } else if (method === 'DELETE') { // מחיקת אימון
            WorkoutsDB.deleteWorkout(id);
            callback({ status: 200, message: 'Workout deleted successfully' });

        } else {
            callback({ status: 400, message: 'Invalid request' });
        }
    }
};
