"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postCtrl_1 = require("../../Model/post/postCtrl");
const AuthMiddleware_1 = require("../../middlewares/Auth/AuthMiddleware");
const postRoute = express_1.default.Router();
postRoute.post('/', AuthMiddleware_1.AuthMiddleWare, postCtrl_1.CreatePostCtrl);
postRoute.put('/likes', AuthMiddleware_1.AuthMiddleWare, postCtrl_1.LikePostCtrl);
postRoute.put('/dislikes', AuthMiddleware_1.AuthMiddleWare, postCtrl_1.DislikePostCtrl);
postRoute.get('/', postCtrl_1.GetAllPostsCtrl);
postRoute.get('/:id', postCtrl_1.GetPostCtrl);
postRoute.put('/:id', AuthMiddleware_1.AuthMiddleWare, postCtrl_1.UpdatePostCtrl);
postRoute.delete('/:id', AuthMiddleware_1.AuthMiddleWare, postCtrl_1.DeletePostCtrl);
exports.default = postRoute;
