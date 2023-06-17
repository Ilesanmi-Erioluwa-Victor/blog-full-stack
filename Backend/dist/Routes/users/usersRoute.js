"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersCtrl_1 = require("../../Model/user/UsersCtrl");
const AuthMiddleware_1 = require("../../middlewares/Auth/AuthMiddleware");
const usersRoutes = express_1.default.Router();
usersRoutes.post('/register', UsersCtrl_1.Create_user);
usersRoutes.post('/login', UsersCtrl_1.Login);
usersRoutes.put('/profilePhotoUpload', AuthMiddleware_1.AuthMiddleWare, 
// PhotoUpload.single("image"),
UsersCtrl_1.Profile_photo_upload);
usersRoutes.put('/follow', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.Following_user);
// Password rest
usersRoutes.post('/forgetPasswordToken', UsersCtrl_1.Forget_password_token);
usersRoutes.put('/PasswordReset', UsersCtrl_1.Password_reset);
usersRoutes.put('/unfollow', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.Un_follow_user);
usersRoutes.post('/sendMail', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.Generate_verification);
usersRoutes.put('/verifyAccount', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.Account_verification);
usersRoutes.put('/blockUser/:id', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.Block_user);
usersRoutes.put('/UnBlockUser/:id', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.Unblock_user);
usersRoutes.get('/', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.Get_users);
usersRoutes.put('/password', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.Update_password);
usersRoutes.get('/profile/:id', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.User_profile);
usersRoutes.put('/:id', AuthMiddleware_1.AuthMiddleWare, UsersCtrl_1.Update_user_profile);
usersRoutes.delete('/:id', UsersCtrl_1.Delete_user);
usersRoutes.get('/:id', UsersCtrl_1.Get_user);
exports.default = usersRoutes;
