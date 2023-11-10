const routers = require('express').Router();
const { validate } = require('express-validation');
const userController = require('../Controller/userController');
const validateUser = require('../Validation/UserValidation');
const doesMiddlewere = require('../Middlewares/doesMiddlewere')

const initialzation = () => {
    // allGetRoutes();
    allPostRoutes();
}

const allGetRoutes = () => {
}

const allPostRoutes = () => { 
    routers.post('/signup',validate(validateUser?.signUpSchema), doesMiddlewere.userExist, userController.userDetail)
}

const patchRoutes = () => { }

const delteRoutes = () => { }

initialzation();
module.exports = routers;
