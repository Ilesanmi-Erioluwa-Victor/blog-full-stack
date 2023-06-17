"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryCtrl_1 = require("../../Model/category/categoryCtrl");
const AuthMiddleware_1 = require("../../middlewares/Auth/AuthMiddleware");
const categoryRoute = express_1.default.Router();
categoryRoute.post('/', AuthMiddleware_1.AuthMiddleWare, categoryCtrl_1.CreateCategoryCtrl);
categoryRoute.get('/', AuthMiddleware_1.AuthMiddleWare, categoryCtrl_1.GetAllCategoryCtrl);
categoryRoute.get('/:id', AuthMiddleware_1.AuthMiddleWare, categoryCtrl_1.GetCategoryCtrl);
categoryRoute.put('/:id', AuthMiddleware_1.AuthMiddleWare, categoryCtrl_1.UpdateCategory);
categoryRoute.delete('/:id', AuthMiddleware_1.AuthMiddleWare, categoryCtrl_1.DeleteCategoryCtrl);
exports.default = categoryRoute;
