import express from "express";
import cors from "cors"
// const sgMail = require("@sendgrid/mail")
const app = express();
import dbConnect from "./config/db/dbConnect";
import dotenv from "dotenv";
dotenv.config();
import { ErrorHandler, NotFound } from "./middlewares/error/ErrorHandler";

// DB
dbConnect();

// Routes
const usersRoutes = require("./Routes/users/usersRoute");
const postRoute = require("./Routes/posts/postRoute");
const commentRoutes = require("./Routes/comments/commentRoutes");
const emailRoutes = require("./Routes/sendMail/sendMail");
const categoryRoute = require("./Routes/categorys/categoryRoute");

// Middleware
app.use(express.json());
// Cors
app.use(cors());
// Users Routes
// Note, i use my route path in 'usersRoutes' folder
app.use("/api/users", usersRoutes);

// Post Routes
// Note, i use my route path in 'usersRoutes' folder
app.use("/api/posts", postRoute);

// Comment Routes
// Note, i use my route path in 'usersRoutes' folder
app.use("/api/comments", commentRoutes);

// Sendmail Routes
// Note, i use my route path in 'usersRoutes' folder
app.use("/api/mails", emailRoutes);

// Category Routes
// Note, i use my route path in 'usersRoutes' folder
app.use("/api/categorys", categoryRoute);


// always call your middleware under all your app.
app.use(NotFound);
app.use(ErrorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Your server is running on : ${PORT}`));

//
