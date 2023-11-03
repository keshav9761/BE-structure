const app = require('./Server');
const PORT = 9000;

app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`);
})