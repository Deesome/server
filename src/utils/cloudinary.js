import {v2 as cloudinary} from"cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
    api_key: `${process.env.CLOUDINARY_API_KEY}`, 
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});



async function uploadCloudinary(localFilePath){
    if(!localFilePath) return null
    const uploadResult = await cloudinary.uploader
    .upload(localFilePath,
        {
            resource_type: "auto"
        }
    )
    .catch((error) => {
        console.log("Upload Failed on Cloudinary",error);
        fs.unlinkSync(localFilePath)
    });
    
    fs.unlinkSync(localFilePath)
    return uploadResult

  
  }

  export {uploadCloudinary}
 