import express from "express";
import cors from "cors"
// const sgMail = require("@sendgrid/mail")
import dbConnect from "./config/db/dbConnect";

const app = express();
import dotenv from "dotenv";
dotenv.config();
import { ErrorHandler, NotFound } from "./middlewares/error/middleware";

// DB
dbConnect();

// Routes
import usersRoutes from "./Routes/users/usersRoute";
import postRoute from "./Routes/posts/postRoute";
import commentRoutes from "./Routes/comments/commentRoutes";
import emailRoutes from "./Routes/sendMail/sendMail";
import categoryRoute from "./Routes/categorys/categoryRoute";

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

dbConnect().then(() => { 
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Your server is running on : ${PORT}`);
    });
    
})

//
