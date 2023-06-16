const express = require("express");
const { SendEmailCtrl } = require("../../Controller/emailMsg/emailMsgCtrl");
const AuthMiddleWare = require("../../middlewares/Auth/AuthMiddleware");
const emailRoutes = express.Router();

emailRoutes.post("/",AuthMiddleWare, SendEmailCtrl);

module.exports = emailRoutes;