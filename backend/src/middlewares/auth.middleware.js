import User from "../model/user.model.js"
import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"

const verifyJWT = async(req,res,next) =>{
    try{
        console.log("Cookie = ",req.cookies)
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        if(!accessToken){
            throw new ApiError(401,"User not found")
        }
        const decodedToken = await jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401,"Invalid Token")
        }
        req.user = user;
        next();
    }
    catch(error){
        throw new ApiError(401,error?.message || "Invalid Token")
    }
}

export default verifyJWT