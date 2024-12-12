import { asyncHandler } from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { Blog } from "../models/blog.models.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";


//Add Blog

const addBlog = asyncHandler(async(req,res)=>{
    //get the data from form/multipart
    //validation of data 
    //add blog to db
    const {title,content,tags,author} = req.body

    if(title == "" && content == "" && tags == "" && author ==""){
        throw new apiError(400,"All Fields are required")
    }

    const blogImageLocalPath = req.file?.path  || ""
    
    

    const blogImageCloudinary = await uploadCloudinary(blogImageLocalPath)
    if(!blogImageCloudinary){
        throw new apiError(400,"Blog Image didnt upload on cloundinary")
    }
   
    
        const blog = await Blog.create({
            title,
            content,
            tags,
            author,
            blogImage : blogImageCloudinary?.url


        })

        if(!blog){
            throw new apiError(400,"Something Went wrong while creating blog")
        }

        res.status(201).json(
            new apiResponse(200,blog,"Blog Created Successfully"
                        
            )
        )


    
})

//get all blogs
// get single bog with a id
// update a blog
// delete a blog

export {addBlog}