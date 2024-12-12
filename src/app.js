import express from "express";
import cors from "cors"
import cookieParser from 'cookie-parser';




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










export default app