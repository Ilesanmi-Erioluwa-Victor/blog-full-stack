"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const generateToken = (id) => {
    if (!process.env.JWT_KEY)
        throw new Error('JWT_KEY is required in environment');
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_KEY, { expiresIn: '30d' });
};
exports.default = generateToken;
