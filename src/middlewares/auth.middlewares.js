import { asyncHandler } from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import jwt from "jsonwebtoken"


const verifyToken = asyncHandler(async (req, res,next) => {

  try {
    const token = req.cookies.accessToken
    console.log("---------Access token", token)

    if (!token) {
      throw new apiError(400, "Token not found")
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log("------Decode", decoded)
    req.userId = decoded._id
    next()
  } catch (error) {
    throw new apiError("Invalid Token")

  }


})

export default verifyToken