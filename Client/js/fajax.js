class FXMLHttpRequest {
    constructor() {
        this.method = '';
        this.url = '';
        this.async = true;
        this.headers = {};
        this.responseText = '';
        this.status = 0;  // נוסיף שדה סטטוס
        this.success = false; // נוסיף שדה הצלחה
        this.onload = null;
    }

    open(method, url, async = true) {
        this.method = method;
        this.url = url;
        this.async = async;
    }

    send(data = null) {
        Network.sendRequest(this.method, this.url, data, (response) => {
            this.responseText = JSON.stringify(response);
            this.status = response.status || 200;  
            this.success = response.success || false;  

            if (this.onload) this.onload(); 
        });
    }
}
