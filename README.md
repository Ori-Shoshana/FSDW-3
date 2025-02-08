# Fitness Tracker - Hevy-Like Workout Routine

## 📁 Project Structure
This project is a Full-Stack JavaScript application that follows a client-server architecture with simulated communication using Fake AJAX (FAJAX) and data storage in Local Storage.

```
fitness-tracker/
│── index.html        # Homepage with login & workout interface
│── styles.css        # CSS styles
│── scripts/
│   ├── main.js       # Handles UI logic & event listeners
│   ├── api.js        # Fake AJAX requests
│   ├── storage.js    # Manages Local Storage
│── data/
│   ├── workouts.json # Sample workout data
│── server/
│   ├── fake-server.js # Simulated backend
│── README.md         # Project documentation
```

---

## 🔹 Features
1. **User Authentication**: Login & Signup page.
2. **Workout Logging**: Add exercises, set reps, weight, duration.
3. **Workout History**: Display past workouts in a table.
4. **Data Persistence**: Workouts saved in **Local Storage**.
5. **Graphical Progress Tracking**: Use `Chart.js` for visualizing progress.
6. **Fake API Communication**: Simulated backend using FAJAX.

---

## 📡 Data Flow
1. **User Logs a Workout** ➝ `main.js` sends request to `api.js`.
2. **API Sends Fake Request to `fake-server.js`** ➝ Server returns a response.
3. **Workout is Stored in Local Storage (`storage.js`)**.
4. **Workouts Displayed in UI (Table & Graph).**

---

## 📝 File Descriptions
### **1️⃣ `index.html` – Homepage**
Contains the HTML structure of the site, including:
- A **form** for adding new workouts.
- A **table** displaying workout history.
- A **graph** showing workout progress.
  
### **2️⃣ `styles.css` – Site Styling**
- Defines the overall appearance of the site.
- Styles tables, forms, and buttons.
  
### **3️⃣ `scripts/main.js` – UI Management**
- Handles user input for workouts.
- Displays workouts in the table.
- Sends requests to the fake server via `api.js`.
  
### **4️⃣ `scripts/api.js` – Fake AJAX (FAJAX)**
- Simulates communication with the backend.
- Handles `GET`, `POST`, `PUT`, and `DELETE` requests with mock responses.
  
### **5️⃣ `scripts/storage.js` – Local Storage Management**
- Saves workouts in Local Storage.
- Loads them when the user reopens the website.
  
### **6️⃣ `data/workouts.json` – Sample Data**
Contains example workout entries:
```json
[
  {"id": 1, "date": "2025-02-01", "type": "Running", "duration": 30, "calories": 300},
  {"id": 2, "date": "2025-02-02", "type": "Cycling", "duration": 45, "calories": 400}
]
```
  
### **7️⃣ `server/fake-server.js` – Simulated Backend**
- Listens for requests from `api.js`.
- Sends mock responses in `JSON` format.
- Supports fetching, adding, updating, and deleting workouts.

---

## 📌 Next Steps
1. **Set Up `index.html`** with workout tracking form.
2. **Create `main.js`** to handle UI interactions.
3. **Implement `api.js`** for Fake API requests.
4. **Build `fake-server.js`** for simulated backend.
5. **Add `Chart.js`** for progress tracking.

---

## 🔧 Technologies Used
- **HTML, CSS, JavaScript (Front-End)**
- **Fake AJAX (FAJAX) for API simulation**
- **Local Storage for data persistence**
- **JSON for structured data**
- **Chart.js (or similar) for workout graphs**

---

### 🚀 Want to get started? Load `index.html` in your browser and start tracking your workouts! 💪

