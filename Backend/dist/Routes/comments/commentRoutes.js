"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentCtrl_1 = require("../../Controller/comments/commentCtrl");
const AuthMiddleware_1 = require("../../middlewares/Auth/AuthMiddleware");
const commentRoutes = express_1.default.Router();
commentRoutes.post("/", AuthMiddleware_1.AuthMiddleWare, commentCtrl_1.CreateCommentCtrl);
commentRoutes.get("/", AuthMiddleware_1.AuthMiddleWare, commentCtrl_1.GetAllCommentsCtrl);
commentRoutes.get("/:id", AuthMiddleware_1.AuthMiddleWare, commentCtrl_1.GetCommentDetailCtrl);
commentRoutes.put("/:id", AuthMiddleware_1.AuthMiddleWare, commentCtrl_1.UpdateCommentCtrl);
commentRoutes.delete("/:id", AuthMiddleware_1.AuthMiddleWare, commentCtrl_1.DeleteCommentCtrl);
exports.default = commentRoutes;
