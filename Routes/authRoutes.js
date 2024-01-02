const routers = require('express').Router();
const authController = require('../Controller/authController');
const authValidate = require('../Validation/authValidation');
const doesMiddlewere = require('../Middlewares/doesMiddlewere')

const initialzation = () => {
    allGetRoutes();
    allPostRoutes();
}

const allGetRoutes = () => {
    routers.get('/verifyaccount/:jwtOtp', authController.verifySingup);
    routers.get("/forgetPassword/:email", authValidate.forgetPwd(), doesMiddlewere.verifyValidation, authController.forgetPassword);
    routers.get("/changePwdForm/:jwtToken", authController.resetPassword)
}

const allPostRoutes = () => {
    routers.post('/signup', authValidate.validateUser(), doesMiddlewere.verifyValidation, authController.signupUser)
    routers.post('/signin', authValidate.signinUser(), doesMiddlewere.verifyValidation, authController.signinUser)
    routers.post("/newResetPwd/:jwtToken", authController.newRestPwd)

}

const patchRoutes = () => { }

const delteRoutes = () => { }

initialzation();
module.exports = routers;
