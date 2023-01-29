const expressAsyncHandler = require("express-async-handler");
const User = require("../../Model/user/User");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const generateToken = require("../../config/token/generateToken");
const ValidateMongoDbId = require("../../Utils/ValidateMongoDbId");
const crypto = require("crypto");
const cloudinaryUploadImage = require("../../Utils/Cloudinary");

// SendGrid api config..
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// expressAsyncHandler for error Handling..
//_______________________________Register Ctrol
const UserRegisterCtrl = expressAsyncHandler(async (req, res) => {
  // Avoid Duplicate Registration

  // Register user
  try {
    // const alreadyExist = User.findOne({
    //   email: req?.body?.email,
    // });

    // if (alreadyExist) {
    //   throw new Error("You are already registered..");
    // }

    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(`error ${error.message}`);
  }
});

//_______________________________Login Ctrol
const LoginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  try {
    const userFound = await User.findOne({ email });

    //  check if user is found and the isPasswordMatched method is also true with user password
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
  } catch (error) {
    res.json(error.message);
  }
});

//_______________________________getAllUsers Ctrol
const GetAllUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error.message);
  }
});

//_______________________________Delete User Ctrol
const DeleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  // Check if Id is valid before deleting..
  ValidateMongoDbId(id);
  try {
    const DeletedUser = await User.findByIdAndDelete(id);
    res.json(DeletedUser);
  } catch (error) {
    res.json(`${error.message}`);
  }
});

//_______________________________Get a particular Userdetails Ctrol
const GetUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
});

//_______________________________User Profile Ctrl
const UserProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const userProfile = await User.findById(id).populate("posts");
    res.json(userProfile);
  } catch (error) {
    res.json(error.message);
  }
});

//_______________________________Update UserProfile ctrl
const UpdateUserProfileCtrl = expressAsyncHandler(async (req, res) => {
  // Got the user _id from req.user._id because
  // in my Authmidllware function, we pass in the login user along the function too
  const { _id } = req?.user;
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
  } catch (error) {
    res.json(error.message);
  }
});

//_______________________________Update User Passord ctrl
const UpdatePasswordCtrl = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  ValidateMongoDbId(_id);
  //Find the user by _id
  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

//_______________________________Following ctrl
const FollowingUserCtrl = expressAsyncHandler(async (req, res) => {
  // 1. Find the  user you want to follow and update it's following field..
  const { followId } = req?.body;
  const loginUserId = req?.user?.id;
  //  Find the targetuser and check if he/she is already following, to avoid dupliacte users
  const targetUser = await User.findById(followId);

  const alReadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );

  if (alReadyFollowing) throw new Error("User alreday follows..");

  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );

  // 2. Update the login user following field..
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );

  res.send(`You have successfully followed this user`);
});

//_______________________________UnFollowing ctrl
const UnfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req?.body;
  const loginUserId = req?.user?.id;

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
  res.json("You have successfully unfollow this user");
});

//_______________________________Block User ctrl
const BlockUserCtrl = expressAsyncHandler(async (req, res) => {
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
  } catch (error) {
    res.json(error.message);
  }
});

//_______________________________UnBlock User ctrl
const UnBlockUserCtrl = expressAsyncHandler(async (req, res) => {
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

//_______________________________Generate Email Verification Token (Send Mail) ctrl
const GenerateVerificationCtrl = expressAsyncHandler(async (req, res) => {
  const loginUserId = req.user.id;

  const user = await User.findById(loginUserId);
  console.log(user);
  try {
    // Generate token
    const verificationToken = await user.createAccountVerificationToken();
    // save user
    await user.save();
    console.log(verificationToken);
    // Send Message
    const resetUrl = `If you were requetsed to verify your account, verify now, otherwise ignore this message
     <a href="http://localhost:3000/verify-account/${verificationToken}">Click to verify..</a>
    `;
    const msg = {
      to: "ifedayo1452@gmail.com", // Change to your recipient
      from: "ericjay1452@gmail.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: resetUrl,
    };

    await sgMail.send(msg).then(() => {
      res.json(resetUrl);
    });
  } catch (error) {
    res.json(error.message);
  }
});

//_______________________________Account Verification ctrl
const AccountVerificationCtrl = expressAsyncHandler(async (req, res) => {
  const { token } = req?.body;
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user by token
  const userFound = await User.findOne({
    accountVerificationToken: hashToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });

  if (!userFound) throw new Error("Token expired, try agin...");
  // update this propert( isAccountVerified to true)
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;

  await userFound.save();
  res.json(userFound);
});

//_______________________________Forgetpassword Token Generator ctrl
const ForgetPasswordTokenCtrl = expressAsyncHandler(async (req, res) => {
  // 1.Find user by email
  const { email } = req?.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("No user found..");

  try {
    const token = await user.createPasswordResetToken();
    await user.save();

    // Send Message
    const resetUrl = `If you were requetsed to reset your account password, reset now, otherwise ignore this message
     <a href="http://localhost:3000/verify-account/${token}">Click to verify..</a>
    `;
    const msg = {
      to: email,
      from: "ericjay1452@gmail.com",
      subject: "Verify your email",
      html: resetUrl,
    };
    const sendMsg = await sgMail.send(msg);
    res.json({
      message: `A successful message has been sent to ${user?.email},${resetUrl}`,
    });
  } catch (error) {
    res.json(error.message);
  }
});

//_______________________________PasswordResetctrl
const PasswordResetCtrl = expressAsyncHandler(async (req, res) => {
  const { token, password } = req?.body;

  try {
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    // Find this user by token;
    const user = await User.findOne({
      passwordResetToken: hashToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token expired, try again later...");

    //  Update/ Change user password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
});

//_______________________________Profile Photo uploadctrl
const ProfilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
  // Find login user
  const { _id } = req?.user;
  ValidateMongoDbId(_id);
  // Get path to image
  const localPath = `public/images/profile/${req.file.filename}`;

  // Upload image to Cloudinary...
  try {
    const UploadImg = await cloudinaryUploadImage(localPath);
    const user = await User.findByIdAndUpdate(
      _id,
      {
        profilePhoto: UploadImg?.url,
      },
      { new: true }
    );

    // Remove Uploaded img
    fs.unlinkSync(localPath);
    res.json(user);
  } catch (error) {
    res.json(error.message);
  }
});
module.exports = {
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
  PasswordResetCtrl,
  ProfilePhotoUploadCtrl,
};
