import { Router } from "express";
import { addBlog,blogs,blogById,deleteBlog,updateBlog } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import verifyToken from "../middlewares/auth.middlewares.js";

const blogRouter = Router()

blogRouter.route("/addBlog").post(verifyToken,upload.single("blogImage"),addBlog)
blogRouter.route("/blog").get(blogs)
blogRouter.route("/blog/:id").get(blogById)
blogRouter.route("/blog/:id").post(verifyToken,deleteBlog)
blogRouter.route("/blog/:id").put(verifyToken,upload.single("blogImage"),updateBlog)


export {blogRouter}