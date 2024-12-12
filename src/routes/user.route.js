import {Router} from "express"
import {registerUser,login} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middlewares.js"





const userRouter = Router()


userRouter.route("/register").post(upload.single("avatar"),registerUser)
userRouter.route("/login").post(login)


export default userRouter