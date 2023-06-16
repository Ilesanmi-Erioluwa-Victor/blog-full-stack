const express = require("express");
const {
  CreateCommentCtrl,
  GetAllCommentsCtrl,
  GetCommentDetailCtrl,
  UpdateCommentCtrl,
  DeleteCommentCtrl
} = require("../../Controller/comments/commentCtrl");

const AuthMiddleWare = require("../../middlewares/Auth/AuthMiddleware");

const commentRoutes = express.Router();

commentRoutes.post("/", AuthMiddleWare, CreateCommentCtrl);
commentRoutes.get("/", AuthMiddleWare, GetAllCommentsCtrl);
commentRoutes.get("/:id", AuthMiddleWare, GetCommentDetailCtrl);
commentRoutes.put("/:id", AuthMiddleWare, UpdateCommentCtrl);
commentRoutes.delete("/:id", AuthMiddleWare, DeleteCommentCtrl);

module.exports = commentRoutes;
