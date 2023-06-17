"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCommentCtrl = exports.UpdateCommentCtrl = exports.GetCommentDetailCtrl = exports.GetAllCommentsCtrl = exports.CreateCommentCtrl = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Comment_1 = __importDefault(require("../../Model/comment/Comment"));
const ValidateMongoDbId_1 = __importDefault(require("../../Utils/ValidateMongoDbId"));
exports.CreateCommentCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const user = req.AuthId;
    const { postId } = req === null || req === void 0 ? void 0 : req.body;
    (0, ValidateMongoDbId_1.default)(postId);
    try {
        const comment = await Comment_1.default.create({
            post: postId,
            user,
            description: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.description,
        });
        res.json(comment);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.GetAllCommentsCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const comment = await Comment_1.default.find({}).sort('-created');
        res.json(comment);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.GetCommentDetailCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    const { commentId } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(commentId);
    try {
        const comment = await Comment_1.default.findById(commentId);
        res.json(comment);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.UpdateCommentCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    var _a, _b;
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const comment = await Comment_1.default.findByIdAndUpdate(id, {
            post: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.postId,
            user: req.AuthId,
            description: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.description,
        }, { new: true, runValidators: true });
        res.json(comment);
    }
    catch (error) {
        res.json(error.message);
    }
});
exports.DeleteCommentCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    (0, ValidateMongoDbId_1.default)(id);
    try {
        const comment = await Comment_1.default.findByIdAndDelete(id);
        res.json(comment);
    }
    catch (error) {
        res.json(error.message);
    }
});
