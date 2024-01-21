const restServer = require('./restServer');
// const ngrok = require('ngrok')
const R_PORT = 9000, S_PORT = 9001;
// const NGROK_AUTH = '2aoLv2m2XH2O0p8sHskD778xj5V_7QvoXKMhsvPJFAAywyY7S'

restServer.listen(R_PORT, async (req, res) => {
    // const url = await ngrok.connect({  addr: S_PORT, authtoken: NGROK_AUTH });
    global.GLOBAL_BASEURL = `http://51.21.1.57:3000`;
    console.log(`REST Server is running on port http://localhost:${S_PORT}`);
    console.log("Global Socket Server:", `wss://51.21.1.57:3000`);
})