const express = require('express');
const app = express();
const webSocket = require('express-ws');
const PORT = 9001;
webSocket(app)

let count = 1;
app.ws('/echo', (ws, req) => {

    ws.on('message', (message) => {
      console.log('Received message:', message);
      setInterval(() => ws.send(`message from server ${count ++ }`), 1000);
    });
    
});

app.listen(PORT, () => {
    console.error('SOCKET Server is running on port http://localhost:9001')
});
