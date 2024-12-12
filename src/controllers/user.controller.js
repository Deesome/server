import { asyncHandler } from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import {User} from "../models/user.models.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import {apiResponse} from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req, res) => {

    const { userName, email, fullName, password } = req.body
   

    if(fullName =="" && email=="" && password =="" && userName==""){
        throw new apiError(400,"All fileds are rquired")
    }

   const existedUser =  await User.findOne({
        $or : [{userName},{email}]
    })

    if(existedUser){
        throw new apiError(409,"user with emailid and username already exists")
    }
    
    const avatarLocalPath = req.file?.path;
    

    if(!avatarLocalPath){
        throw new apiError(400,"Avatar is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)
    console.log(avatar)

    if(!avatar){
        throw new apiError(400,"Avatar is required")
    }

    const user = await User.create({
        userName : userName.toLowerCase(),
        email,
        fullName,
        password,
        avatar : avatar.url
        
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new apiError(500,"Something went wrong while registerning user")
    }

    return res.status(201).json(
        new apiResponse(200,createdUser,"user Registerd Succesfully")
    )

})

const login = asyncHandler(async(req,res)=>{
    // take username password from body
    //find username in database by id that user exist or not 
    //password check 
    //generate access token and refresh token
    //return  access token to the user
    //save refresh toen to database 

    const {userName,password} = req.body
    if(userName == "" && password == ""){
        throw new apiError(400,"Username and Password is required")
    }
    const user = await User.findOne({userName})
    

    if(!user){
        throw new apiError(404,"Username Does not exist")
    }

    const isValid = await user.isPasswordCorrect(password)
    
    if(!isValid){
        throw new apiError(401,"Invalid Password")

    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.save({validateBeforeSave:false})

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    console.log("Logged in User", loggedInUser)

    const options = {
        httpOnly : true,
        secure : true
    }

    

    return res.status(200)
              .cookie("accessToken",accessToken,options)
              .cookie("refreshToken",refreshToken,options)
              .json(
                new apiResponse(
                    200,
                    {
                        user : loggedInUser,
                    },
                    "User Logged in successfully"
                )
              )

             





})

const logout = asyncHandler(async(req,res)=>{
    //user authorisation before making the request , 
    //so we have to find userid to make sure user is logged in 
    //clear refreshToken form database
    //clear cookie from browser 
})
export { registerUser,login }