class FAJAX {
    static request({ method, url, data = {}, onSuccess, onError }) {
        console.log(`FAJAX: Sending ${method} request to ${url}`);
        
        const randomValue = Math.random(); // מספר רנדומלי בין 0 ל-1
        if (randomValue < 0.2) { // השמטה בהסתברות של 20%
            console.warn("FAJAX: Request dropped", method, url);
            onError("Network error: Request was lost.");
            return;
        }
        
        setTimeout(() => {
            try {
                let response;
                if (url.startsWith("/api/workouts")) {
                    response = Server.handleRequest(method, url, data);
                } else if (url.startsWith("/api/auth")) {
                    response = AuthServer.handleRequest(method, url, data);
                } else {
                    throw new Error("Not Found");
                }
                onSuccess(response);
            } catch (error) {
                onError(error.message);
            }
        }, Math.random() * 2000 + 1000); // דיליי 1-3 שניות
    }
}

function fajax({ method, url, data }) {
    return new Promise((resolve, reject) => {
        FAJAX.request({
            method,
            url,
            data,
            onSuccess: resolve,
            onError: reject
        });
    });
}