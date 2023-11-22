const routers = require('express').Router();
const userController = require('../Controller/userController');
const validateUser = require('../Validation/UserValidation');
const doesMiddlewere = require('../Middlewares/doesMiddlewere')

const initialzation = () => {
    allGetRoutes();
    allPostRoutes();
}

const allGetRoutes = () => {
    routers.get('/email', userController.sendMail)
}

const allPostRoutes = () => {
    routers.post('/signup', validateUser.validateUser(), doesMiddlewere.verifyValidation, userController.userDetail)
}

const patchRoutes = () => { }

const delteRoutes = () => { }

initialzation();
module.exports = routers;
