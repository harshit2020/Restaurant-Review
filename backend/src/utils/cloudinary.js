import cloudinary from 'cloudinary';
import ApiError from './ApiError.js';
import fs from 'fs';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async(filepath)=>{
    try{
        const isUploaded = await cloudinary.v2.uploader
        .upload(filepath,{
        resource_type:"auto"
        })
        if(isUploaded){
            console.log("File uploaded Successfully ",isUploaded.url)
            fs.unlink(filepath,(err)=>{
                if(err){
                    console.log("Failed to delete the local file after uploading to Cloudinary")
                }
            })
        }
        return isUploaded;
    }
    catch(error){
            fs.unlink(filepath,(err)=>{
                if(err){
                    console.log("Failed to delete the local file after uploading to Cloudinary Failed")
                }
            })
        throw new ApiError(500,"Failed to upload on Cloudinary")
    }

}

export default uploadOnCloudinary