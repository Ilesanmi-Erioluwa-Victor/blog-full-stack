import expressAsyncHandler from 'express-async-handler';
import {
  StatusCodes,
} from 'http-status-codes';
import { Request } from 'express';
import { User } from './User';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import dotenv from 'dotenv';
import generateToken from '../../config/token/generateToken';
import ValidateMongoDbId from '../../Utils/ValidateMongoDbId';
import crypto from 'crypto';
import { throwError }  from '../../helpers/ControllerError';
// import cloudinaryUploadImage from '../../Utils/Cloudinary';

dotenv.config();

interface CustomRequest extends Request {
  AuthId?: string;
}

if (!process.env.SENDGRID_API_KEY)
  throw new Error('SENDGRID_API_KEY is required');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const Create_user = expressAsyncHandler(async (req, res) => {
  const { email } = req?.body;
  try {
    if (await User?.emailTaken(email)) {
      throwError(
        'You are already registered, just log in to your account', StatusCodes.BAD_REQUEST
      );
    }

    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error: any) {
    res.json(`sorry, ${error.message}`);
  }
});

export const Login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email: email });

    if (userFound && (await userFound.isPasswordMatched(password))) {
      res.json({
        _id: userFound?._id,
        firstName: userFound?.firstName,
        lastName: userFound?.lastName,
        email: userFound?.email,
        profilePhoto: userFound?.profilePhoto,
        isAdmin: userFound?.isAdmin,
        token: generateToken(userFound?._id),
      });
    } else {
      res.status(401);
      throw new Error(`Login Failed, invalid credentials..`);
    }
  } catch (error: any) {
    res.json(error.message);
  }
});

export const Get_users = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const Delete_user = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const DeletedUser = await User.findByIdAndDelete(id);
    res.json(DeletedUser);
  } catch (error: any) {
    res.json(`${error.message}`);
  }
});

export const Get_user = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const User_profile = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const userProfile = await User.findById(id).populate('posts');
    res.json(userProfile);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const Update_user_profile = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    const _id = req?.AuthId as string;
    ValidateMongoDbId(_id);
    try {
      const userProfile = await User.findByIdAndUpdate(
        _id,
        {
          firstName: req?.body?.firstName,
          lastName: req?.body?.lastName,
          email: req?.body?.email,
          bio: req?.body?.bio,
        },
        { new: true, runValidators: true }
      );

      res.json(userProfile);
    } catch (error: any) {
      res.json(error.message);
    }
  }
);

export const Update_password = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    const _id = req?.AuthId as string;
    const { password } = req.body;
    ValidateMongoDbId(_id);
    const user = await User.findById(_id);

    if (password) {
      const updatedUser = await user?.save();
      res.json(updatedUser);
    } else {
      res.json(user);
    }
  }
);

export const Following_user = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    const { followId } = req.body;
    const loginUserId = req.AuthId;
    const targetUser = await User.findById(followId);

    const alReadyFollowing = targetUser?.followers?.find(
      (user) => user?.toString() === (loginUserId?.toString() as string)
    );

    if (alReadyFollowing) throw new Error('User already follows..');

    await User.findByIdAndUpdate(
      followId,
      {
        $push: { followers: loginUserId },
        isFollowing: true,
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      loginUserId,
      {
        $push: { following: followId },
      },
      { new: true }
    );

    res.send(`You have successfully followed this user`);
  }
);

export const Un_follow_user = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    const { unFollowId } = req?.body;
    const loginUserId = req.AuthId;

    await User.findByIdAndUpdate(
      unFollowId,
      {
        $pull: { followers: loginUserId },
        isFollowing: false,
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      loginUserId,
      {
        $pull: { following: unFollowId },
      },
      { new: true }
    );
    res.json('You have successfully unfollow this user');
  }
);

export const Block_user = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );

    res.json(user);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const Unblock_user = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {}
});

export const Generate_verification = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    const loginUserId = req.AuthId;

    const user = await User.findById(loginUserId);
    try {
      const verificationToken = await user?.createAccountVerificationToken();
      await user?.save();
      console.log(verificationToken);
      const resetUrl = `If you were requested to verify your account, verify now, otherwise ignore this message
     <a href="http://localhost:3000/verify-account/${verificationToken}">Click to verify..</a>
    `;
      const msg = {
        to: 'ifedayo1452@gmail.com', // Change to your recipient
        from: 'ericjay1452@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: resetUrl,
      };

      await sgMail.send(msg).then(() => {
        res.json(resetUrl);
      });
    } catch (error: any) {
      res.json(error.message);
    }
  }
);

export const Account_verification = expressAsyncHandler(async (req, res) => {
  const { token } = req?.body;
  const hashToken = crypto.createHash('sha256').update(token).digest('hex');

  const userFound = await User.findOne({
    accountVerificationToken: hashToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });

  if (!userFound) throw new Error('Token expired, try agin...');
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;

  await userFound.save();
  res.json(userFound);
});

export const Forget_password_token = expressAsyncHandler(async (req, res) => {
  const { email } = req?.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error('No user found..');

  try {
    const token = await user.createPasswordResetToken();
    await user.save();

    const resetUrl = `If you were requested to reset your account password, reset now, otherwise ignore this message
     <a href="http://localhost:3000/verify-account/${token}">Click to verify..</a>
    `;
    const msg = {
      to: email,
      from: 'ericjay1452@gmail.com',
      subject: 'Verify your email',
      html: resetUrl,
    };
    const sendMsg = await sgMail.send(msg);
    res.json({
      message: `A successful message has been sent to ${user?.email},${resetUrl}`,
    });
  } catch (error: any) {
    res.json(error.message);
  }
});

export const Password_reset = expressAsyncHandler(async (req, res) => {
  const { token, password } = req?.body;

  try {
    const hashToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error('Token expired, try again later...');

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const Profile_photo_upload = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    const _id = req?.AuthId as string;
    ValidateMongoDbId(_id);
    // const localPath = `public/images/profile/${req.file.filename}`;

    try {
      // const UploadImg = await cloudinaryUploadImage(localPath);
      const user = await User.findByIdAndUpdate(
        _id,
        // {
        //   profilePhoto: UploadImg?.url,
        // },
        { new: true }
      );
      // fs.unlinkSync(localPath);
      res.json(user);
    } catch (error: any) {
      res.json(error.message);
    }
  }
);
