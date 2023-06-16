import express from 'express';
import {
  UserRegisterCtrl,
  LoginUserCtrl,
  GetAllUsersCtrl,
  DeleteUserCtrl,
  GetUserDetailsCtrl,
  UserProfileCtrl,
  UpdateUserProfileCtrl,
  UpdatePasswordCtrl,
  FollowingUserCtrl,
  UnfollowUserCtrl,
  BlockUserCtrl,
  UnBlockUserCtrl,
  GenerateVerificationCtrl,
  AccountVerificationCtrl,
  ForgetPasswordTokenCtrl,
  PasswordResetCtrl,
  ProfilePhotoUploadCtrl,
} from '../../Controller/users/UsersCtrl';
import { AuthMiddleWare } from '../../middlewares/Auth/AuthMiddleware';

const usersRoutes = express.Router();

usersRoutes.post('/register', UserRegisterCtrl);

usersRoutes.post('/login', LoginUserCtrl);

usersRoutes.put(
  '/profilePhotoUpload',
  AuthMiddleWare,
  // PhotoUpload.single("image"),
  ProfilePhotoUploadCtrl
);

usersRoutes.put('/follow', AuthMiddleWare, FollowingUserCtrl);
// Password rest
usersRoutes.post('/forgetPasswordToken', ForgetPasswordTokenCtrl);
usersRoutes.put('/PasswordReset', PasswordResetCtrl);

usersRoutes.put('/unfollow', AuthMiddleWare, UnfollowUserCtrl);
usersRoutes.post('/sendMail', AuthMiddleWare, GenerateVerificationCtrl);
usersRoutes.put('/verifyAccount', AuthMiddleWare, AccountVerificationCtrl);
usersRoutes.put('/blockUser/:id', AuthMiddleWare, BlockUserCtrl);
usersRoutes.put('/UnBlockUser/:id', AuthMiddleWare, UnBlockUserCtrl);
usersRoutes.get('/', AuthMiddleWare, GetAllUsersCtrl);
usersRoutes.put('/password', AuthMiddleWare, UpdatePasswordCtrl);
usersRoutes.get('/profile/:id', AuthMiddleWare, UserProfileCtrl);
usersRoutes.put('/:id', AuthMiddleWare, UpdateUserProfileCtrl);
usersRoutes.delete('/:id', DeleteUserCtrl);
usersRoutes.get('/:id', GetUserDetailsCtrl);

export default usersRoutes;
