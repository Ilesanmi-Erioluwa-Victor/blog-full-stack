const express = require("express");
const {
  CreateCategoryCtrl,
  GetAllCategoryCtrl,
  GetCategoryCtrl,
  UpdateCategory,
  DeleteCategoryCtrl
} = require("../../Controller/category/categoryCtrl");
const AuthMiddleWare = require("../../middlewares/Auth/AuthMiddleware");

const categoryRoute = express.Router();

categoryRoute.post("/", AuthMiddleWare, CreateCategoryCtrl);
categoryRoute.get("/", AuthMiddleWare, GetAllCategoryCtrl);
categoryRoute.get("/:id", AuthMiddleWare, GetCategoryCtrl);
categoryRoute.put("/:id", AuthMiddleWare, UpdateCategory);
categoryRoute.delete("/:id", AuthMiddleWare, DeleteCategoryCtrl);

module.exports = categoryRoute;
