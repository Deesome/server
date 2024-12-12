import { Router } from "express";
import { addBlog } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import verifyToken from "../middlewares/auth.middlewares.js";

const blogRouter = Router()

blogRouter.route("/addBlog").post(verifyToken,upload.single("blogImage"),addBlog)


export {blogRouter}