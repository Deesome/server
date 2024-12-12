
import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
        lowercase : true,
    },
    content : {
        type : String,
        required : true,
        lowercase:true
    },

    blogImage : {
        type : String,
        default : ""
    },

    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    tags : [
        {type :String}
    ]
},{timestamps:true})

export const Blog = mongoose.model("Blog",blogSchema)