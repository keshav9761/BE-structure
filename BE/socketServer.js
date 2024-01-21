const express = require('express');
const app = express();
const webSocket = require('express-ws');
const PORT = 9001;
webSocket(app)

let location = 1;
app.ws('/echo', (ws, req) => {

    ws.on('message', (message) => {
      console.log('Received from Mobile', message);
      location = message;
    });
    
});

// let lat = 28.6872974, lng = 77.4822982
app.ws('/echoLocation', (ws, req) => {

    setInterval(() => {
      console.log('Send to Web App:', location);
      ws.send(JSON.stringify(location))
    }, 3000);
  
});

app.listen(PORT, () => {
    console.error('SOCKET Server is running on port http://localhost:9001')
});
