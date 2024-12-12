import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

async function connectDb() {
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        console.log("MongoDB connection Successfull || HOST :",response.connection.host)
        
    } catch (error) {
        console.log("Connection Error",error)
        
    }
    
}

export default connectDb