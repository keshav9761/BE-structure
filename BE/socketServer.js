const express = require('express');
const app = express();
const webSocket = require('express-ws');
webSocket(app)


let count = 1;
app.ws('/echo', (ws, req) => {
    console.error('websocket connection');
    // for (var t = 0; t < 50; t++)
      setInterval(() => ws.send(`message from server ${count ++ }`), 1000);
  });

module.exports = app

app.listen(9001, () => {
    console.error('SOCKET Server is running on port http://localhost:9001')
});
