import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
          
cloudinary.config({ //verify if account is legitmate
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});  

const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath) return null
        const response=await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        console.log(response);
        console.log("file is uploaded on cloudinary",resource.url);
        //after success write fs.unlinkSync(localFilePath)
        return response
    }catch(error){
          fs.unlink(localFilePath)  
          return null
    }
    
}

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });