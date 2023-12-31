const express = require('express');
const expressWs = require('express-ws');
const cors = require('cors');
const authRouters = require('./Routes/authRoutes');
// const userRouters = require('./Routes/userRoutes');
const dbConfig = require('./Utilities/dbConfig');
const { ExpressValidator } = require('express-validator');

const app = express();
expressWs(app);

const initializaton = () => {
    configCors();
    configParser();
    configDatabase();
    configRoutes();
    config404();
    configGlobalHandler();
}

const configCors = () => {
    // CORS middleware
    app.use(cors());
}

const configParser = () => {
    app.use(express.json())
    // app.use(express.urlencoded({extended: true}))
    app.set('view engine', 'ejs');
}

const configDatabase = () => {
    // Database connection
    dbConfig.connect((err, result) => {
        if (err) { return console.log("error", err) }
        console.log("database connected successful")
    })
}

//http://localhost:9000/users/---
const configRoutes = () => {
    app.use('/users', authRouters)
}

const config404 = () => {
    app.use((req, res) => {
        res.status(500).send('Invalid Route');
    })
}

const configGlobalHandler = () => {
    app.use(function(err, req, res, next) {
        console.log("globalERR", err)
        if (err instanceof ExpressValidator) {
          const collectErr = err?.details?.body?.map((v)=> v?.message);
          return res.send({errMsg: collectErr?.at(0)})
        }
        // next({statusCode: 400, error: "Errors"})
        return res.status(400).send({errMsg: err?.errors, status: err?.statusCode})
      })
 }

initializaton();

module.exports = app;