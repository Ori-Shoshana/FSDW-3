class Database {
    constructor() {
        this.users = JSON.parse(localStorage.getItem("users")) || {};
    }

    save() {
        localStorage.setItem("users", JSON.stringify(this.users));
    }

    registerUser(username, password, email) {
        if (this.users[username]) {
            return { success: false, message: "Username already exists" };
        }
        this.users[username] = { username, password, email, workouts: [] };
        this.save();
        return { success: true, message: "Registration successful" };
    }

    loginUser(username, password) {
        if (!this.users[username]) {
            return { success: false, message: "User not found" };
        }
        if (this.users[username].password !== password) {
            return { success: false, message: "Incorrect password" };
        }
        return { success: true, message: "Login successful", user: this.users[username] };
    }

    getUser(username) {
        return this.users[username] || null;
    }

    updateUser(username, newData) {
        if (!this.users[username]) {
            return { success: false, message: "User not found" };
        }
        this.users[username] = { ...this.users[username], ...newData };
        this.save();
        return { success: true, message: "User updated successfully" };
    }
}

const db = new Database();
