const WorkoutsDB = {
    getWorkouts: () => JSON.parse(localStorage.getItem('workouts')) || [],

    addWorkout: (workout) => {
        const workouts = WorkoutsDB.getWorkouts();
        workout.id = Date.now().toString(); // מזהה ייחודי
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    },

    deleteWorkout: (id) => {
        let workouts = WorkoutsDB.getWorkouts();
        workouts = workouts.filter(workout => workout.id !== id);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    },

    getWorkout: (id) => {
        const workouts = WorkoutsDB.getWorkouts();
        return workouts.find(workout => workout.id === id) || null;
    },

    editWorkout: (id, updatedWorkout) => {
        let workouts = WorkoutsDB.getWorkouts();
        workouts = workouts.map(workout => 
            workout.id === id ? { ...workout, ...updatedWorkout } : workout
        );
        localStorage.setItem('workouts', JSON.stringify(workouts));
    },
};

const AuthDB = {
    getUsers: () => {
        const users = JSON.parse(localStorage.getItem('users'));
        return Array.isArray(users) ? users : [];
    },

    addUser: (user) => {
        const users = AuthDB.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    },

    getUser: (username) => {
        const users = AuthDB.getUsers();
        return users.find(user => user.username === username) || null;
    },

    updateUser: (username, updatedUser) => {
        let users = AuthDB.getUsers();
        users = users.map(user => 
            user.username === username ? { ...user, ...updatedUser } : user
        );
        localStorage.setItem('users', JSON.stringify(users));
    },
};

