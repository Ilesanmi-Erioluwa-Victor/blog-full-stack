"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// const sgMail = require("@sendgrid/mail")
const dbConnect_1 = __importDefault(require("./config/db/dbConnect"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const middleware_1 = require("./middlewares/error/middleware");
// DB
(0, dbConnect_1.default)();
// Routes
const usersRoute_1 = __importDefault(require("./Routes/users/usersRoute"));
const postRoute_1 = __importDefault(require("./Routes/posts/postRoute"));
const commentRoutes_1 = __importDefault(require("./Routes/comments/commentRoutes"));
const sendMail_1 = __importDefault(require("./Routes/sendMail/sendMail"));
const categoryRoute_1 = __importDefault(require("./Routes/categorys/categoryRoute"));
// Middleware
app.use(express_1.default.json());
// Cors
app.use((0, cors_1.default)());
app.use("/api/users", usersRoute_1.default);
app.use("/api/posts", postRoute_1.default);
app.use("/api/comments", commentRoutes_1.default);
app.use("/api/mails", sendMail_1.default);
app.use("/api/categorys", categoryRoute_1.default);
app.use(middleware_1.NotFound);
app.use(middleware_1.ErrorHandler);
// Server
(0, dbConnect_1.default)().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Your server is running on : ${PORT}`);
    });
});
//
