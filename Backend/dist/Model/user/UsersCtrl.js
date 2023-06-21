"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile_photo_upload = exports.Password_reset = exports.Forget_password_token = exports.Account_verification = exports.Generate_verification = exports.Unblock_user = exports.Block_user = exports.Un_follow_user = exports.Following_user = exports.Update_password = exports.Update_user_profile = exports.User_profile = exports.Get_user = exports.Delete_user = exports.Get_users = exports.Login = exports.Create_user = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = require("./User");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
const generateToken_1 = __importDefault(require("../../config/token/generateToken"));
const ValidateMongoDbId_1 = __importDefault(require("../../Utils/ValidateMongoDbId"));
const crypto_1 = __importDefault(require("crypto"));
const ControllerError_1 = require("../../helpers/ControllerError");
// import cloudinaryUploadImage from '../../Utils/Cloudinary';
dotenv_1.default.config();
if (!process.env.SENDGRID_API_KEY)
    throw new Error('SENDGRID_API_KEY is required');
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
exports.Create_user = (0, express_async_handler_1.default)(async (req, res) => {
    var _a, _b, _c, _d;
    const { email } = req === null || req === void 0 ? void 0 : req.body;
    try {
        if (await (User_1.User === null || User_1.User === void 0 ? void 0 : User_1.User.emailTaken(email))) {
            (0, ControllerError_1.throwError)('You are already registered, just log in to your account');
        }
        const user = await User_1.User.create({
            firstName: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.firstName,
            lastName: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.lastName,
            email: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email,
            password: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.password,
        });
        res.json(user);
    }
    catch (error) {
        res.json(`sorry, ${error.message}`);
    }
});
exports.Login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User_1.User.findOne({ email: email });
        if (userFound && (await userFound.isPasswordMatched(password))) {
            res.json({
                _id: userFound === null || userFound === void 0 ? void 0 : userFound._id,
                firstName: userFound === null || userFound === void 0 ? void 0 : userFound.firstName,
                lastName: userFound === null || userFound === void 0 ? void 0 : userFound.lastName,
                email: userFound === null || userFound === void 0 ? void 0 : userFound.email,
                profilePhoto: userFound === null || userFound === void 0 ? void 0 : userFound.profilePhoto,
                isAdmin: userFound === null || userFound === void 0 ? void 0 : userFound.isAdmin,
                token: (0, generateToken_1.default)(userFound === null || userFound === void 0 ? void 0 : userFound._id),
            });
        }
        else {
            res.status(401);
            throw new Error(`Login Failed, invalid credentials..`);
        }
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.Get_users = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const users = await User_1.User.find({});
        res.json(users);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.Delete_user = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const DeletedUser = await User_1.User.findByIdAndDelete(id);
        res.json(DeletedUser);
    }
    catch (error) {
        res.json(`${error.message}`);
    }
});
exports.Get_user = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const user = await User_1.User.findById(id);
        res.json(user);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.User_profile = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const userProfile = await User_1.User.findById(id).populate('posts');
        res.json(userProfile);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.Update_user_profile = (0, express_async_handler_1.default)(async (req, res) => {
    var _a, _b, _c, _d;
    const _id = req === null || req === void 0 ? void 0 : req.AuthId;
    (0, ValidateMongoDbId_1.default)(_id);
    try {
        const userProfile = await User_1.User.findByIdAndUpdate(_id, {
            firstName: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.firstName,
            lastName: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.lastName,
            email: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email,
            bio: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.bio,
        }, { new: true, runValidators: true });
        res.json(userProfile);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.Update_password = (0, express_async_handler_1.default)(async (req, res) => {
    const _id = req === null || req === void 0 ? void 0 : req.AuthId;
    const { password } = req.body;
    (0, ValidateMongoDbId_1.default)(_id);
    const user = await User_1.User.findById(_id);
    if (password) {
        const updatedUser = await (user === null || user === void 0 ? void 0 : user.save());
        res.json(updatedUser);
    }
    else {
        res.json(user);
    }
});
exports.Following_user = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const { followId } = req.body;
    const loginUserId = req.AuthId;
    const targetUser = await User_1.User.findById(followId);
    const alReadyFollowing = (_a = targetUser === null || targetUser === void 0 ? void 0 : targetUser.followers) === null || _a === void 0 ? void 0 : _a.find((user) => (user === null || user === void 0 ? void 0 : user.toString()) === (loginUserId === null || loginUserId === void 0 ? void 0 : loginUserId.toString()));
    if (alReadyFollowing)
        throw new Error('User already follows..');
    await User_1.User.findByIdAndUpdate(followId, {
        $push: { followers: loginUserId },
        isFollowing: true,
    }, { new: true });
    await User_1.User.findByIdAndUpdate(loginUserId, {
        $push: { following: followId },
    }, { new: true });
    res.send(`You have successfully followed this user`);
});
exports.Un_follow_user = (0, express_async_handler_1.default)(async (req, res) => {
    const { unFollowId } = req === null || req === void 0 ? void 0 : req.body;
    const loginUserId = req.AuthId;
    await User_1.User.findByIdAndUpdate(unFollowId, {
        $pull: { followers: loginUserId },
        isFollowing: false,
    }, { new: true });
    await User_1.User.findByIdAndUpdate(loginUserId, {
        $pull: { following: unFollowId },
    }, { new: true });
    res.json('You have successfully unfollow this user');
});
exports.Block_user = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const user = await User_1.User.findByIdAndUpdate(id, {
            isBlocked: true,
        }, { new: true });
        res.json(user);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.Unblock_user = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const user = await User_1.User.findByIdAndUpdate(id, {
            isBlocked: false,
        }, { new: true });
        res.json(user);
    }
    catch (error) { }
});
exports.Generate_verification = (0, express_async_handler_1.default)(async (req, res) => {
    const loginUserId = req.AuthId;
    const user = await User_1.User.findById(loginUserId);
    try {
        const verificationToken = await (user === null || user === void 0 ? void 0 : user.createAccountVerificationToken());
        await (user === null || user === void 0 ? void 0 : user.save());
        console.log(verificationToken);
        const resetUrl = `If you were requested to verify your account, verify now, otherwise ignore this message
     <a href="http://localhost:3000/verify-account/${verificationToken}">Click to verify..</a>
    `;
        const msg = {
            to: 'ifedayo1452@gmail.com',
            from: 'ericjay1452@gmail.com',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: resetUrl,
        };
        await mail_1.default.send(msg).then(() => {
            res.json(resetUrl);
        });
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.Account_verification = (0, express_async_handler_1.default)(async (req, res) => {
    const { token } = req === null || req === void 0 ? void 0 : req.body;
    const hashToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
    const userFound = await User_1.User.findOne({
        accountVerificationToken: hashToken,
        accountVerificationTokenExpires: { $gt: new Date() },
    });
    if (!userFound)
        throw new Error('Token expired, try agin...');
    userFound.isAccountVerified = true;
    userFound.accountVerificationToken = undefined;
    userFound.accountVerificationTokenExpires = undefined;
    await userFound.save();
    res.json(userFound);
});
exports.Forget_password_token = (0, express_async_handler_1.default)(async (req, res) => {
    const { email } = req === null || req === void 0 ? void 0 : req.body;
    const user = await User_1.User.findOne({ email });
    if (!user)
        throw new Error('No user found..');
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
        const sendMsg = await mail_1.default.send(msg);
        res.json({
            message: `A successful message has been sent to ${user === null || user === void 0 ? void 0 : user.email},${resetUrl}`,
        });
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.Password_reset = (0, express_async_handler_1.default)(async (req, res) => {
    const { token, password } = req === null || req === void 0 ? void 0 : req.body;
    try {
        const hashToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
        const user = await User_1.User.findOne({
            passwordResetToken: hashToken,
            passwordResetExpires: { $gt: Date.now() },
        });
        if (!user)
            throw new Error('Token expired, try again later...');
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.json(user);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.Profile_photo_upload = (0, express_async_handler_1.default)(async (req, res) => {
    const _id = req === null || req === void 0 ? void 0 : req.AuthId;
    (0, ValidateMongoDbId_1.default)(_id);
    // const localPath = `public/images/profile/${req.file.filename}`;
    try {
        // const UploadImg = await cloudinaryUploadImage(localPath);
        const user = await User_1.User.findByIdAndUpdate(_id, 
        // {
        //   profilePhoto: UploadImg?.url,
        // },
        { new: true });
        // fs.unlinkSync(localPath);
        res.json(user);
    }
    catch (error) {
        res.json(error.message);
    }
});
