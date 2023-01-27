const express = require("express");
const {
  CreatePostCtrl,
  GetAllPostsCtrl,
  GetPostCtrl,
  UpadatePostCtrl,
  DeletPostCtrl,
  LikePostCtrl,
  DislikePostCtrl
} = require("../../Controller/posts/postCtrl");
const AuthMiddleWare = require("../../middlewares/Auth/AuthMiddleware");
const {
  PhotoUpload,
  PostPhotoResize,
} = require("../../middlewares/Upload/PhotoUpload");

const postRoute = express.Router();

postRoute.post(
  "/",
  AuthMiddleWare,
  PhotoUpload.single("image"),
  PostPhotoResize,
  CreatePostCtrl
);
postRoute.put("/likes",AuthMiddleWare, LikePostCtrl);
postRoute.put("/dislikes",AuthMiddleWare, DislikePostCtrl);
postRoute.get("/", GetAllPostsCtrl);
postRoute.get("/:id", GetPostCtrl);
postRoute.put("/:id", AuthMiddleWare, UpadatePostCtrl);
postRoute.delete("/:id",AuthMiddleWare, DeletPostCtrl);


module.exports = postRoute;
