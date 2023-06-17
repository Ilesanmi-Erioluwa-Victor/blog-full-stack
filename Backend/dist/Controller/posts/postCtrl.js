"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DislikePostCtrl = exports.LikePostCtrl = exports.DeletePostCtrl = exports.UpdatePostCtrl = exports.GetPostCtrl = exports.GetAllPostsCtrl = exports.CreatePostCtrl = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bad_words_1 = __importDefault(require("bad-words"));
const Post_1 = __importDefault(require("../../Model/post/Post"));
const ValidateMongoDbId_1 = __importDefault(require("../../Utils/ValidateMongoDbId"));
const User_1 = require("../../Model/user/User");
// import cloudinaryUploadImage from '../../Utils/Cloudinary';
exports.CreatePostCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    var _a, _b;
    const _id = req.AuthId;
    const filter = new bad_words_1.default();
    const profaneWord = filter.isProfane((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title);
    const profaneTitle = filter.isProfane((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.description);
    if (profaneWord || profaneTitle) {
        await User_1.User.findByIdAndUpdate(_id, {
            isBlocked: true,
        }, { new: true });
        throw new Error('You have been blocked because, your posts contains Profane words..');
    }
    try {
        // const localPath = `public/images/posts/${req.file.filename}`;
        // const UploadImg = await cloudinaryUploadImage(localPath);
        const post = await Post_1.default.create(Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { 
            // image: UploadImg.url,
            user: _id }));
        res.json(post);
    }
    catch (error) {
        res.json(error);
    }
});
exports.GetAllPostsCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const posts = await Post_1.default.find({}).populate('user');
        res.json(posts);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.GetPostCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const post = await Post_1.default.findById(id)
            .populate('user')
            .populate('dislikes')
            .populate('likes');
        await Post_1.default.findByIdAndUpdate(id, {
            $inc: {
                numViews: 1,
            },
        }, { new: true });
        res.json(post);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.UpdatePostCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const post = await Post_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { user: req.AuthId }), { new: true });
        res.json(post);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.DeletePostCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const post = await Post_1.default.findByIdAndDelete(id);
        res.json(post);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.LikePostCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const { postId } = req.body;
    const post = await Post_1.default.findById(postId);
    const loginUserId = req.AuthId;
    const isLiked = post === null || post === void 0 ? void 0 : post.isLiked;
    const alreadyDisliked = (_a = post === null || post === void 0 ? void 0 : post.dislikes) === null || _a === void 0 ? void 0 : _a.find((userId) => userId.toString() === loginUserId.toString());
    if (alreadyDisliked) {
        const post = await Post_1.default.findByIdAndUpdate(postId, {
            $pull: { dislikes: loginUserId },
            isDisLiked: false,
        }, { new: true });
        res.json(post);
    }
    if (isLiked) {
        const post = await Post_1.default.findByIdAndUpdate(postId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        }, { new: true });
        res.json(post);
    }
    else {
        const post = await Post_1.default.findByIdAndUpdate(postId, {
            $push: { likes: loginUserId },
            isLiked: true,
        }, { new: true });
        res.json(post);
    }
});
exports.DislikePostCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const { postId } = req.body;
    const post = await Post_1.default.findById(postId);
    const loginUserId = req.AuthId;
    const isDisLiked = post === null || post === void 0 ? void 0 : post.isDisliked;
    const alreadyLiked = (_a = post === null || post === void 0 ? void 0 : post.likes) === null || _a === void 0 ? void 0 : _a.find((userId) => userId.toString() === loginUserId.toString());
    if (alreadyLiked) {
        const post = await Post_1.default.findOneAndUpdate(postId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        }, { new: true });
        res.json(post);
    }
    if (isDisLiked) {
        const post = await Post_1.default.findByIdAndUpdate(postId, {
            $pull: { dislikes: loginUserId },
            isDisLiked: false,
        }, { new: true });
        res.json(post);
    }
    else {
        const post = await Post_1.default.findByIdAndUpdate(postId, {
            $push: { dislikes: loginUserId },
            isDisLiked: true,
        }, { new: true });
        res.json(post);
    }
});
