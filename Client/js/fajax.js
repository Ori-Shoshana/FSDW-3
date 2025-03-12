class FXMLHttpRequest {
    constructor() {
        this.method = '';
        this.url = '';
        this.async = true;
        this.responseText = '';
        this.status = 0;  // נוסיף שדה סטטוס
        this.success = false; // נוסיף שדה הצלחה
        this.onload = null;
    }

    // this method is called by the client code
    // it initializes the request and sends it
    open(method, url, async = true) {
        this.method = method;
        this.url = url;
        this.async = async;
    }

    // this method is called by the client code
    // it sends the request to the server
    send(data = null) {
        Network.sendRequest(this.method, this.url, data, (response) => {
            this.responseText = JSON.stringify(response);
            this.status = response.status || 200;  
            this.success = response.success || false;  

            if (this.onload) this.onload(); 
        });
    }
}
