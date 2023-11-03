const express = require('express');
const cors = require('cors');
const Routers = require('./Routes/userRoutes');
const dbConfig = require('./Utilities/dbConfig');
const { ValidationError } = require('express-validation');

const app = express()

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
    app.use('/users', Routers)
}

const config404 = () => {
    app.use((req, res) => {
        res.status(500).send('Invalid Route');
    })
}

const configGlobalHandler = () => {
    app.use(function(err, req, res, next) {
        if (err instanceof ValidationError) {
          return res.status(err.statusCode).json(err)
        }
        return res.status(500).json(err)
      })
 }

initializaton();

module.exports = app;