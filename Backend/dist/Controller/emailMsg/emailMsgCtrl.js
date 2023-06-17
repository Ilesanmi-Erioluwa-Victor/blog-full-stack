"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailCtrl = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const bad_words_1 = __importDefault(require("bad-words"));
const EmailMsg_1 = __importDefault(require("../../Model/EmailMsg/EmailMsg"));
exports.SendEmailCtrl = (0, express_async_handler_1.default)(async (req, res) => {
    const { to, subject, message } = req.body;
    const emailMessage = `${subject} ${message}`;
    const filter = new bad_words_1.default();
    const isProfane = filter.isProfane(emailMessage);
    if (isProfane)
        throw new Error('Email sent failed, because it contains profane words.');
    try {
        const msg = {
            to,
            subject,
            text: message,
            from: 'ericjay1452@gmail.com',
        };
        await mail_1.default.send(msg);
        await EmailMsg_1.default.create({
            sentBy: req.AuthId,
            from: req.AuthId.email,
            to,
            message,
            subject,
        });
        res.json('Mail sent');
    }
    catch (error) {
        res.json(error.message);
    }
});
