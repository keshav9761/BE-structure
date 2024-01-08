const express = require('express');

// const initialzation = () => {
//     allGetRoutes();
// }

// const allGetRoutes = () => {
//       app.ws('/', (s, req) => {
//         console.error('websocket connection');
//         for (var t = 0; t < 3; t++)
//           setTimeout(() => s.send('message from server', ()=>{}), 1000*t);
//       });
// }

// initialzation();
// module.exports = routers;

var router = express.Router();

router.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});