import Review from "../model/review.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js"
import reviewQueue from "../utils/queue.js";
import connection from "../utils/redisConnection.js";

const reviewRestaurant = asyncHandler(async(req,res)=>{
    const userID = req.user._id
    const {review} = req.body
    const {restaurantId} = req.params
    if(review.length==0){
        throw new ApiError(400,"review cannot be empty")
    }
    const reviewUpload = await Review.create({
        user:userID,
        restaurant:restaurantId,
        review:review,
        sentiment:"Pending"
    })
    const reviewUploaded = await Review.findById(reviewUpload._id)
    if(!reviewUploaded){
        throw new ApiError(400,"review upload failed!")
    }

    await reviewQueue.add("analyze-review",{
        reviewId:reviewUpload._id.toString(),
        text:reviewUpload.review
    })

    return res
    .json(
        new ApiResponse(200,reviewUpload,"Review Uploaded successfully!")
    )
})

const editReview = asyncHandler(async(req,res)=>{
    const userID = req.user._id
    const {review} = req.body
    const {reviewId} = req.params
    if(review.length==0){
        throw new ApiError(400,"review cannot be empty")
    }
    const oldReview = await Review.findById(reviewId)
    if(!oldReview){
        throw new ApiError(400,"No review by user")
    }
    const reviewUserId = oldReview.user
    console.log("User ID comparison : ")
    console.log(userID)
    console.log(reviewUserId)
    if(!userID.equals(reviewUserId)){
        throw new ApiError(400,"review cannot be edited by another user")
    }
    oldReview.review = review
    oldReview.sentiment = "Pending";
    await oldReview.save({validateBeforeSave:false})

    await reviewQueue.add("analyze-review",{
        reviewId:oldReview._id.toString(),
        text:oldReview.review
    })

    return res
    .json(
        new ApiResponse(200,oldReview,"Review Updated successfully")
    )
})

const deleteReview = asyncHandler(async(req,res)=>{
    const userID = req.user._id
    const {reviewId} = req.params

    const oldReview = await Review.findById(reviewId)
    if(!oldReview){
        throw new ApiError(400,"No review by user")
    }
    const reviewUserId = oldReview.user
    if(!userID.equals(reviewUserId)){
        throw new ApiError(400,"review cannot be edited by another user")
    }
    await Review.findByIdAndDelete(oldReview._id)
    await connection.zrem("leaderboard:reviews",reviewId)
    if(oldReview.sentiment == "POSITIVE"){
        await connection.zrem("leaderboard:Prestaurant",oldReview.restaurant)
    }
    else{
        await connection.zrem("leaderboard:Nrestaurant",oldReview.restaurant)
    }
    //delete from leaderboard:reviews and leaderboard:PandNrestaurant
    return res
    .json(
        new ApiResponse(400,{},"Review Deleted Successfully!!")
    )
})

export {
    reviewRestaurant,
    editReview,
    deleteReview
}