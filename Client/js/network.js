const Network = {
    sendRequest: (method, url, data, callback) => {

        console.log(`Network: Sending ${method} request to ${url}`);

        // Remove the random failure simulation
        // const randomValue = Math.random();  
        // if (randomValue < 0.5) { // השמטה בהסתברות של 10% עד 50%
        //     callback({ status: 0, message: 'Failed to fetch' });
        //     return;
        // }

        setTimeout(() => {
            if (url.startsWith('/api/workouts')) {
                WorkoutServer.handleRequest(method, url, data, callback);
            } else if (url.startsWith('/api/auth')) {
                AuthServer.handleRequest(method, url, data, callback);
            } else if (url.startsWith('/api/memberships')) {
                MembershipServer.handleRequest(method, url, data, callback);
            } else {
                callback({ status: 404, message: 'Not Found' });
            }
        }, Math.random() * 2000 + 1000); // השהיה של 1-3 שניות
    }
};