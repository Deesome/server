import {Router} from "express"
import {registerUser,login,logout,refreshAccessToken, updateCurrentPassword} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middlewares.js"
import verifyToken from "../middlewares/auth.middlewares.js"





const userRouter = Router()


userRouter.route("/register").post(upload.single("avatar"),registerUser)
userRouter.route("/login").post(login)
userRouter.route("/logout").post(verifyToken,logout)
userRouter.route("/refreshAccessToken").post(refreshAccessToken)
userRouter.route("/updateCurrentPassword").post(verifyToken,updateCurrentPassword)


export default userRouter