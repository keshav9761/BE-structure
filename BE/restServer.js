const express = require('express');
const cors = require('cors');
const authRouters = require('./Routes/authRoutes');
const userRouters = require('./Routes/userRoutes');
const dbConfig = require('./Utilities/dbConfig');
const { ExpressValidator } = require('express-validator');

const app = express()
const ws = require('express-ws')(app);
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
    // app.use('/ws', userRouters)
    app.ws('/ws', (s, req) => {
        console.error('websocket connection');
        for (var t = 0; t < 3; t++)
          setTimeout(() => s.send('message from server', ()=>{}), 1000*t);
      });
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