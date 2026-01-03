import Restaurant from '../model/restaurant.model.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import uploadOnCloudinary from '../utils/cloudinary.js'


const restaurantRegister = asyncHandler(async(req,res)=>{
    const {rest_email,rest_name} = req.body
    if(!(rest_email&&rest_name)){
        throw new ApiError(401,"All fields are mandatory")
    }
    const existingRestaurant = await Restaurant.findOne({restaurantEmail:rest_email})
    if(existingRestaurant){
        throw new ApiError(401,"Restaurant with same email already exists!!")
    }
    const restProfilePhotoPath = req.files?.restProfilePhoto[0]?.path
    const cloudResponse = await uploadOnCloudinary(restProfilePhotoPath)
    if(!cloudResponse){
        throw new ApiError(500,"Upload on Cloudinary failed!!")
    }
    const createRes = await Restaurant.create({
        owner:req.user._id,
        name:rest_name,
        restaurantEmail:rest_email,
        profilePhoto:cloudResponse.url
    })

    const isRes = await Restaurant.findById(createRes._id)
    if(!isRes){
        throw new ApiError(500,"Restaurant registration failed")
    }
    return res
    .json(
        new ApiResponse(200,isRes,"Restaurant registered successfully!!")
    )
})


const getUserofRestaurant = asyncHandler(async(req,res)=>{
    const {restID} = req.params
    const result  = await Restaurant.findById(restID)
    const userID = result.owner
    return res
    .json(
        new ApiResponse(200,userID,"Restaurant owner Fetched Successfully!!")
    )
})


const editRestaurantofUser = asyncHandler(async(req,res)=>{
    const {restaurantID} = req.params
    const userID = req.user._id
    const userRestaurant = await Restaurant.findById(restaurantID)
    console.log("userRestaurant owner ID = ",userRestaurant.owner)
    console.log("verifyJwT user ID = ",userID)
    if(!userRestaurant.owner.equals(userID)){
        throw new ApiError(401,"Not allowed")
    }
    const{name,restaurantEmail} = req.body
    const imagePath = req.files?.profilePhoto[0].path
    if(imagePath){
        const cloudinaryUploadStatus = await uploadOnCloudinary(imagePath)
        if(!cloudinaryUploadStatus){
            throw new ApiError(501,"Uploading image error occured!")
        }
        userRestaurant.profilePhoto = cloudinaryUploadStatus.url
    }
    userRestaurant.name = name
    userRestaurant.restaurantEmail = restaurantEmail
    await userRestaurant.save({validateBeforeSave:false})
    return res
    .json(
        new ApiResponse(200,userRestaurant,"Restaurant details updated!")
    )
})

export{
    restaurantRegister,
    getUserofRestaurant,
    editRestaurantofUser
}