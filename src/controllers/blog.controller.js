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

 const blogs = asyncHandler(async(req,res)=>{
    //get all blofs from db
   try {
    const blogs =  await Blog.find()
 
    console.log(blogs)
    res.status(200).json(
     new apiResponse(200,blogs,"All blogs fetched successfully")
    )
   } catch (error) {
     throw new apiError(500,error.message)
    
   }



 })
// get single bog with a id
const blogById = asyncHandler(async(req,res)=>{
    // get id from params
    //search the blog by id in db
    //send that blog in response

    const {id} = req.params
    if(!id){
        throw new apiError(400,"Blog ID is required")
    }

    try {
         const blog = await Blog.findById(id)
         if(!blog){
            throw new apiError(404,"Blog Not Found")
         }

         res.status(200).json(
            new apiResponse(200,
                blog,
                `blog by ${id} fetched Successfully`
            )
         )
        
    } catch (error) {
        throw new apiError(500,error.message || "failed to fetch the blog")
        
    }

})
// update a blog
const updateBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params
const {title,content,tags,author} = req.body
const blogImageLocalPath = req.file?.path
console.log(blogImageLocalPath)

try {
    const blog = await Blog.findById(id)
    console.log(blog)
    if(!blog){
        throw new apiError(404,"Blog not found")
    }
    if(title) blog.title = title
    if(content) blog.content = content
    if(tags) blog.tags = tags
    if(author) blog.author = author

    if(blogImageLocalPath){
        const blogImageCloudinary = await uploadCloudinary(blogImageLocalPath)
        if(!blogImageCloudinary){
            throw new apiError(400,"failed to upload new blog image")
        }

        blog.blogImage = blogImageCloudinary.url
    }

    

    
    const newBlog = await blog.save({validateBeforeSave : false})
    if(!newBlog){
        throw new apiError(500,"Something wnet wrong while updating")
    }
    
    res.status(201).json(
        new apiResponse(200,
            newBlog,
            "Update Successfully"
        )
    )
} catch (error) {
    throw new apiError(400,error.message || "Blog Fetched unsuccessfull")
    
}

})


// delete a blog

const deleteBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params
    if(!id){
        throw new apiError(400,"Blog id is required to delete the blog")
    }

    try {
        await Blog.deleteOne({_id : id})
        const blog = await Blog.findById(id)
        if(blog){
            throw new apiError(500,"Blog delete unsuccessfull")
        }

        res.status(200).json(
            new apiResponse(200,
                "Blog delete Successfull"
            )
        )

        
    } catch (error) {
        throw new apiError(401,error.message || "blog for delete failed")
        
    }


})

export {addBlog,blogs,blogById,deleteBlog,updateBlog    }