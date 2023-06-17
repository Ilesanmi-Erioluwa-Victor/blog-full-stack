import express from 'express';
import {
  Delete_user,
  User_profile,
  Update_user_profile,
  Update_password,
  Following_user,
  Un_follow_user,
  Block_user,
  Unblock_user,
  Generate_verification,
  Account_verification,
  Forget_password_token,
  Password_reset,
  Profile_photo_upload,
  Create_user,
  Login,
  Get_users,
  Get_user,
} from '../../Model/user/UsersCtrl';
import { AuthMiddleWare } from '../../middlewares/Auth/AuthMiddleware';

const usersRoutes = express.Router();

usersRoutes.post('/register', Create_user);

usersRoutes.post('/login', Login);

usersRoutes.put(
  '/profilePhotoUpload',
  AuthMiddleWare,
  // PhotoUpload.single("image"),
  Profile_photo_upload
);

usersRoutes.put('/follow', AuthMiddleWare, Following_user);
// Password rest
usersRoutes.post('/forgetPasswordToken', Forget_password_token);
usersRoutes.put('/PasswordReset', Password_reset);

usersRoutes.put('/unfollow', AuthMiddleWare, Un_follow_user);
usersRoutes.post('/sendMail', AuthMiddleWare, Generate_verification);
usersRoutes.put('/verifyAccount', AuthMiddleWare, Account_verification);
usersRoutes.put('/blockUser/:id', AuthMiddleWare, Block_user);
usersRoutes.put('/UnBlockUser/:id', AuthMiddleWare, Unblock_user);
usersRoutes.get('/', AuthMiddleWare, Get_users);
usersRoutes.put('/password', AuthMiddleWare, Update_password);
usersRoutes.get('/profile/:id', AuthMiddleWare, User_profile);
usersRoutes.put('/:id', AuthMiddleWare, Update_user_profile);
usersRoutes.delete('/:id', Delete_user);
usersRoutes.get('/:id', Get_user);

export default usersRoutes;
