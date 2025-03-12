# Workout Management System

## Overview
The **Workout Management System** is a web application designed to help users manage their workouts. Users can register, log in, and create, edit, delete, and view their workouts. Each user has their own set of workouts, and workouts are only visible to the user who created them.

The application is built using **HTML**, **CSS**, and **JavaScript**, with data persistence handled by **localStorage**. It simulates a server-side environment using a mock AJAX request system (`FXMLHttpRequest`).

---

## Features
- **User Authentication**:
  - Register a new account with a username, email, password, age, gender, fitness goal, and membership type.
  - Log in with a username and password.
  - Log out securely.

- **Workout Management**:
  - Add new workouts with details such as name, duration, intensity, image, and categories (e.g., Cardio, Strength, Flexibility).
  - Edit existing workouts.
  - Delete workouts.
  - View a list of workouts on the dashboard.

- **User-Specific Workouts**:
  - Each user can only see and manage their own workouts.

- **Responsive Design**:
  - The application is designed to work on both desktop and mobile devices.

---

## Technologies Used
- **Frontend**:
  - HTML
  - CSS
  - JavaScript

- **Mock Server**:
  - `FXMLHttpRequest` for simulating AJAX requests.
  - `localStorage` for data persistence.

---

## Setup Instructions

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Edge).
- A code editor (e.g., Visual Studio Code).

### Steps to Run the Project
1. **Download the Project**:
   - Clone or download the project files to your local machine.

2. **Open the Project**:
   - Open the project folder in your code editor.

3. **Run the Application**:
   - Open the `index.html` file in your web browser.
   - The application will load, and you can start using it.

---

## Usage

### 1. **Registration**
- Click on the "Sign up here" link on the login page.
- Fill in the registration form with your details:
  - Username
  - Email
  - Password
  - Age
  - Gender (Male/Female)
  - Fitness Goal (Weight Loss, Muscle Gain, Endurance)
  - Membership Type (Basic, Premium, VIP)
- Click "Sign Up" to create your account.

### 2. **Login**
- Enter your username and password on the login page.
- Click "Login" to access your dashboard.

### 3. **Dashboard**
- The dashboard displays a list of your workouts.
- You can:
  - Add a new workout by clicking "Manage Workouts."
  - Log out by clicking the "Logout" button.

### 4. **Manage Workouts**
- **Add a Workout**:
  - Fill in the workout details:
    - Name
    - Duration (in minutes)
    - Intensity (Low, Medium, High)
    - Image URL
    - Categories (Cardio, Strength, Flexibility)
  - Click "Add Workout" to save the workout.

- **Edit a Workout**:
  - Click the "Edit" button next to a workout.
  - Update the workout details.
  - Click "Save Workout" to save the changes.

- **Delete a Workout**:
  - Click the "Delete" button next to a workout.
  - Confirm the deletion.

---

## File Structure
```
workout-management-system/
│
├── index.html            # Main HTML file for the application
├── css/                  # CSS files
│   └── client.css        # Custom styles for the application
│
├── js/                   # JavaScript files
│   ├── client.js         # Frontend logic for workout management
│   ├── user.js           # User authentication and navigation logic
│   ├── DB.js             # Database simulation using localStorage
│   ├── server.js         # Mock server logic for handling requests
│   ├── fajax.js          # Mock AJAX request system (FXMLHttpRequest)
│   ├── network.js        # Network layer for handling requests
│   └── AuthServer.js     # Authentication server logic
│
└── README.md             # Project documentation
```

---

## Code Examples

### Adding a Workout
```javascript
function addWorkout() {
    const name = document.getElementById("workout-name").value;
    const duration = document.getElementById("workout-duration").value;
    const intensity = document.getElementById("workout-intensity").value;
    const image = document.getElementById("workout-image").value;
    const categories = Array.from(document.querySelectorAll("#workout-category input[name='categories']:checked"))
        .map(checkbox => checkbox.value);

    const currentUser = localStorage.getItem("currentUser");

    const workoutData = {
        name,
        duration,
        intensity,
        image,
        categories,
        userId: currentUser
    };

    const request = new FXMLHttpRequest();
    request.open('POST', '/api/workouts', true);
    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 201) {
            alert('Workout added successfully');
            loadDashboardWorkouts();
        }
    };
    request.send(JSON.stringify(workoutData));
}
```

### Filtering Workouts by User
```javascript
function loadDashboardWorkouts() {
    const currentUser = localStorage.getItem("currentUser");
    const request = new FXMLHttpRequest();
    request.open('GET', '/api/workouts', true);

    request.onload = function() {
        const response = JSON.parse(request.responseText);
        const userWorkouts = response.message.filter(workout => workout.userId === currentUser);

        userWorkouts.forEach(workout => {
            // Display workouts in the dashboard
        });
    };
    request.send();
}
```

---

## Troubleshooting
- **Issue: Workouts are not displayed**:
  - Ensure the `userId` is correctly stored in `localStorage` after logging in.
  - Check the browser console for errors.

- **Issue: Cannot add or edit workouts**:
  - Verify that all required fields are filled in the workout form.
  - Check the browser console for errors.

---

## Future Enhancements
- Add a backend server (e.g., Node.js with Express) for persistent data storage.
- Implement user roles (e.g., Admin, Trainer) with additional features.
- Add workout tracking and progress charts.


Enjoy managing your workouts with the **Workout Management System**! 💪
