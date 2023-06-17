"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailMsgCtrl_1 = require("../../Controller/emailMsg/emailMsgCtrl");
const AuthMiddleware_1 = require("../../middlewares/Auth/AuthMiddleware");
const emailRoutes = express_1.default.Router();
emailRoutes.post('/', AuthMiddleware_1.AuthMiddleWare, emailMsgCtrl_1.SendEmailCtrl);
exports.default = emailRoutes;
