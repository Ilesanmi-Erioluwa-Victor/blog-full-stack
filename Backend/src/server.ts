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
app.use("/api/users", usersRoutes);

app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoutes);
app.use("/api/mails", emailRoutes);
app.use("/api/categorys", categoryRoute);

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
