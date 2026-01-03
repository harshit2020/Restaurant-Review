import User from "../model/user.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import Restaurant from "../model/restaurant.model.js";
import mongoose, { Mongoose } from "mongoose";

const registerUser = asyncHandler(async(req,res) =>{
    //input -> image in cloudinary -> store in db
    const {username,email,password} = req.body
    if(!(username||email||password)){
        throw new ApiError(401,"All fields are mandatory")
    }

    const checkExistedUser = await User.findOne({$or:[{username:username},{email:email}]})
    if(checkExistedUser){
        throw new ApiError(401,"User already exists!!")
    }
    const profilePhotopath = req.files?.profilePhoto[0]?.path
    if(!profilePhotopath){
        throw new ApiError(401,"Please upload profile photo")
    }
    const cloudinaryUpload = await uploadOnCloudinary(profilePhotopath)
    if(!cloudinaryUpload){
        throw new ApiError(501,"Failed to upload image on cloudinary!!")
    }

    const createdUser = await User.create({
        username:username.toLowerCase(),
        email:email,
        password:password,
        profilePhoto:cloudinaryUpload.url
    })

    const checkCreatedUser = await User.findById(createdUser._id).select("-password")
    if(!checkCreatedUser){
        throw new ApiError(501,"Failed to register user")
    }
    else{
        console.log("User created",checkCreatedUser)
    }
    return res
    .status(200)
    .json(
        new ApiResponse(201,checkCreatedUser,"User Created successfully")
    )
})


const loginUser = asyncHandler(async(req,res)=>{
    const{username,password} = req.body
    const isUser = await User.findOne({username:username})
    if(!isUser){
        throw new ApiError(401,`Username ${username}does not exist`)
    }
    const passCheck = await isUser.isPasswordCorrect(password)
    if(!passCheck){
        throw new ApiError(401,"Password is wrong!")
    }
    const accessToken = await isUser.generateAccessToken();
    const refreshToken = await isUser.generateRefreshToken();
    isUser.refreshToken = refreshToken
    await isUser.save({validateBeforeSave:false})
    const options = {
        Http:true,
        secure:true
    }
    
    return res
    .status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{isUser,accessToken,refreshToken},"Login Successfull!!")
    )
})


const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $set:{
            refreshToken:null
        }
    },{new:true})
    const options={
        Http:true,
        secure:true
    }
    res.clearCookie("accessToken",options)
    res.clearCookie("refreshToken",options)
    return res
    .status(201)
    .json(
        new ApiResponse(200,{},"Logout Successful")
    )
})

const getRestaurantofUser = asyncHandler(async(req,res)=>{
    const {userID} = req.params
    const isUser = await User.findById(userID)
    if(!isUser){
        throw new ApiError(400,"User Id not found")
    }
    const restaurants = await Restaurant.aggregate([
        {
            $match:{
                owner:mongoose.Types.ObjectId(userID)
            }
        },
        {
            $project:{
                name : 1,
                restaurantEmail : 1,
                profilePhoto : 1
            }
        }
    ])
    if(restaurants.length==0){
        console.log("No restaurant for the user")
    }
    return res
    .json(
        new ApiResponse(200,restaurants,`Restaurants under user's name : ${isUser.username}`)
    )
})



export {
    registerUser,
    loginUser,
    logoutUser,
    getRestaurantofUser
}