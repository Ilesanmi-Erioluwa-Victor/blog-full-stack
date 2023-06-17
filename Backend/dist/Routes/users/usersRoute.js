"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersCtrl_1 = require("../../Controller/users/UsersCtrl");
const AuthMiddleware_1 = require("../../middlewares/Auth/AuthMiddleware");
const usersRoutes = express_1.default.Router();
usersRoutes.post('/register', UsersCtrl_1.UserRegisterCtrl);
usersRoutes.post('/login', UsersCtrl_1.LoginUserCtrl);
usersRoutes.put('/profilePhotoUpload', AuthMiddleware_1.AuthMiddleWare, 
// PhotoUpload.single("image"),
UsersCtrl_1.ProfilePhotoUploadCtrl);
usersRoutes.put('/follow', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.FollowingUserCtrl);
// Password rest
usersRoutes.post('/forgetPasswordToken', UsersCtrl_1.ForgetPasswordTokenCtrl);
usersRoutes.put('/PasswordReset', UsersCtrl_1.PasswordResetCtrl);
usersRoutes.put('/unfollow', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.UnfollowUserCtrl);
usersRoutes.post('/sendMail', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.GenerateVerificationCtrl);
usersRoutes.put('/verifyAccount', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.AccountVerificationCtrl);
usersRoutes.put('/blockUser/:id', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.BlockUserCtrl);
usersRoutes.put('/UnBlockUser/:id', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.UnBlockUserCtrl);
usersRoutes.get('/', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.GetAllUsersCtrl);
usersRoutes.put('/password', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.UpdatePasswordCtrl);
usersRoutes.get('/profile/:id', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.UserProfileCtrl);
usersRoutes.put('/:id', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.UpdateUserProfileCtrl);
usersRoutes.delete('/:id', UsersCtrl_1.DeleteUserCtrl);
usersRoutes.get('/:id', UsersCtrl_1.GetUserDetailsCtrl);
exports.default = usersRoutes;
