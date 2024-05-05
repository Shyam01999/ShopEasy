const express = require("express");
const authController = require("../../controllers/auth/auth");
const validate = require("../../middleware/validate-middleware");
const {registerSchema, loginSchema} = require("../../validator/auth-validator");
const { isAuthenticated, authorizeRole } = require("../../middleware/auth");
const authRouter = express.Router();

authRouter.route('/register').post(validate(registerSchema), authController.register); 
authRouter.route('/login').post(validate(loginSchema), authController.login);
authRouter.route('/logout').get(isAuthenticated, authController.logout);
authRouter.route('/allusers').get(isAuthenticated, authorizeRole("admin"), authController.getAllUsers);
authRouter.route('/update/user').post(isAuthenticated, authorizeRole("admin"), authController.updateUser);
authRouter.route('/delete/user').post(isAuthenticated, authorizeRole("admin"), authController.deleteUser);
authRouter.route('/password/forgot').post(authController.forgotPassword);
authRouter.route('/password/reset/:token').put(authController.resetPassword);
authRouter.route('/me').get(isAuthenticated, authController.getUserDetails);
authRouter.route('/password/update').put(isAuthenticated, authController.updatePassword); 

module.exports = authRouter;