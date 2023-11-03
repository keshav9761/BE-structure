const Routers = require('express').Router();
const { validate } = require('express-validation');
const userController = require('../Controller/userController');
const validateUser = require('../Validation/UserValidation');

const initialzation = () => {
    allGetRoutes();
    allPostRoutes();
}

const allGetRoutes = () => {
}

const allPostRoutes = () => { 
    Routers.post('/login',validate(validateUser.loginSchema), userController.userDetail)
}

const patchRoutes = () => { }

const delteRoutes = () => { }

initialzation();
module.exports = Routers;
