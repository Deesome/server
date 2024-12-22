import express from "express";
import cors from "cors"
import cookieParser from 'cookie-parser';
import apiError from "./utils/apiError.js";


const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))


app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser());



import userRouter from "./routes/user.route.js";
import { blogRouter } from "./routes/blog.route.js";

app.use("/users",userRouter)
app.use("/blogs",blogRouter)



app.use((err, req, res, next) => {
    if (err instanceof apiError) {
        // Send the JSON error response for your custom error
        return res.status(err.statusCode || 500).json({
            status: "error",
            message: err.message,
            errors: err.errors,
        });
    }

    // If error is not an instance of apiError, send a generic error response
    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
});










export default app