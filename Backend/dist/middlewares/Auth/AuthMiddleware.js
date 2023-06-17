"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleWare = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
exports.AuthMiddleWare = (0, express_async_handler_1.default)(async (req, res, next) => {
    var _a, _b;
    let token;
    try {
        if (req.headers.authorization &&
            ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization.startsWith('Bearer'))) {
            token = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization.split(' ')[1];
            if (!process.env.JWT_KEY) {
                throw new Error('SERVER JWT PASSWORD NOT SET');
            }
            if (token) {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                req.AuthId = decoded.id;
                console.log(req.AuthId);
                next();
            }
            else {
                throw new Error('Error verifying JWT');
            }
        }
        else {
            throw new Error(`Sorry, there is no token attached to your Header, try again by attaching Token..`);
        }
        next();
    }
    catch (error) {
        throw new Error('Sorry No token attached');
    }
});
