const WorkoutServer = {
    handleRequest: (method, url, data, callback) => {
        const id = url.split('/').pop();

        if (method === 'GET' && id === "workouts") { // Fetch all workouts
            const workouts = WorkoutsDB.getWorkouts();
            callback({ status: 201, message: workouts });

        } else if (method === 'GET' && id > 0) { // Fetch a single workout by ID
            const workout = WorkoutsDB.getWorkout(id);
            callback({ status: 200, message: workout });

        } else if (method === 'POST') { // Add a new workout
            const workout = JSON.parse(data);
            WorkoutsDB.addWorkout(workout);
            callback({ status: 201, message: 'Workout added successfully' });

        } else if (method === 'PUT') { // Update an existing workout
            const workout = JSON.parse(data);
            WorkoutsDB.editWorkout(id, workout);
            callback({ status: 201, message: 'Workout updated successfully' });

        } else if (method === 'DELETE') { // Delete a workout
            WorkoutsDB.deleteWorkout(id);
            callback({ status: 200, message: 'Workout deleted successfully' });

        } else {
            callback({ status: 400, message: 'Invalid request' });
        }
    }
};