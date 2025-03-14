const failedAttempts = {}; // מפת משתמשים שנכשלו

const AuthServer = {
    handleRequest: (method, url, data, callback) => {
        const users = AuthDB.getUsers();

        // רישום משתמש חדש
        if (url.endsWith('/register') && method === 'POST') {
            const user = JSON.parse(data);
            const usersArray = Object.values(users);

            if (usersArray.some(u => u.username === user.username)) {
                callback({ status: 400, message: 'User already exists' });
            } else {
                AuthDB.addUser(user);
                callback({ 
                    status: 200, 
                    message: 'User registered successfully', 
                    success: true, 
                    username: user.username 
                });
            }
        } 
        
        // התחברות משתמש קיים
        else if (url.endsWith('/login') && method === 'POST') {
            const user = JSON.parse(data);
            const usersArray = Object.values(users);
            const now = Date.now();
            const lockDuration = 2 * 60 * 1000; // 2 דקות נעילה

            const validUser = usersArray.find(u => u.username === user.username);

            if (!validUser) {
                return callback({ status: 400, message: 'User does not exist' });
            }

            // בדיקה אם המשתמש חסום
            if (failedAttempts[user.username] && failedAttempts[user.username].lockUntil > now) {
                let remainingTime = Math.ceil((failedAttempts[user.username].lockUntil - now) / 1000);
                
                return callback({ 
                    status: 403, 
                    message: `User locked. Try again in ${remainingTime} seconds.`, 
                    remainingTime 
                });
            }

            // בדיקה אם הסיסמה נכונה
            if (validUser.password === user.password) {
                delete failedAttempts[user.username]; // איפוס ניסיונות כושלים
                return callback({ 
                    status: 200, 
                    message: 'Login successful', 
                    success: true, 
                    username: validUser.username,
                    membershipType: validUser.membershipType, // סוג מנוי
                    fitnessGoal: validUser.fitnessGoal // מטרת כושר
                });
                // כאן ניתן להוסיף ערכים נוספים מהמשתמש
            } else {
                failedAttempts[user.username] = failedAttempts[user.username] || { count: 0, lockUntil: 0 };
                failedAttempts[user.username].count++;

                if (failedAttempts[user.username].count >= 3) {
                    failedAttempts[user.username].lockUntil = now + lockDuration;
                    failedAttempts[user.username].count = 0;

                    let remainingTime = lockDuration / 1000;

                    return callback({ 
                        status: 403, 
                        message: `Too many failed attempts. Locked for ${remainingTime} seconds.`, 
                        remainingTime 
                    });
                } else {
                    return callback({
                        status: 401,
                        message: `Incorrect password. ${3 - failedAttempts[user.username].count} attempts remaining.`,
                    });
                }
            }
        } 
        // התנתקות משתמש
        else if (url.endsWith('/logout') && method === 'POST') {
            callback({ status: 200, message: 'Logout successful', success: true });
        }
    }
};
