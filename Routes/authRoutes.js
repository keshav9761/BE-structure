const routers = require('express').Router();
const authController = require('../Controller/authController');
const authValidate = require('../Validation/authValidation');
const doesMiddlewere = require('../Middlewares/doesMiddlewere')

const initialzation = () => {
    allGetRoutes();
    allPostRoutes();
}

const allGetRoutes = () => {
    routers.get('/verifyaccount/:jwtOtp', authController.verifySingup)
}

const allPostRoutes = () => {
    routers.post('/signup', authValidate.validateUser(), doesMiddlewere.verifyValidation, authController.signupUser)
    routers.post('/signin',authValidate.signinUser(),doesMiddlewere.verifyValidation, authController.signinUser )
}

const patchRoutes = () => { }

const delteRoutes = () => { }

initialzation();
module.exports = routers;
