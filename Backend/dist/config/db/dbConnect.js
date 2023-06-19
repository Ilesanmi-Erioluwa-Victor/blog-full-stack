"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGOOSE_STRING = process.env.MONGODB_URL || undefined;
const dbConnect = async () => {
    try {
        if (MONGOOSE_STRING === undefined) {
            throw new Error('MongoDB keys not set');
        }
        else {
            mongoose_1.default.set("strictQuery", true);
            return await mongoose_1.default.connect(MONGOOSE_STRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.default = dbConnect;
