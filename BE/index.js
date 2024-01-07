const restServer = require('./restServer');
// const socketServer = require('./socketServer');
const RPORT = 9000;

restServer.listen(RPORT, (req, res) => {
    console.log(`REST Server is running on port http://localhost:${RPORT}`);
})

// socketServer.listen(SPORT, (req, res) => {
//     console.log(`Socket Server is running on port ws://localhost:${SPORT}`);
// })