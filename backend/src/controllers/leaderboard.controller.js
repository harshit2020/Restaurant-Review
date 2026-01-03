import asynHandler from "../utils/asyncHandler.js";
import connection from "../utils/redisConnection.js";
import Review from "../model/review.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Restaurant from "../model/restaurant.model.js";


const topReviews = asynHandler(async(req,res)=>{
    const leaderboard = await connection.zrevrange("leaderboard:reviews",0,9,"WITHSCORES")
    let result = []
    for(let i=0;i<leaderboard.length;i+=2){
        const reviewId = leaderboard[i]
        const score = leaderboard[i+1]
        let label = ""
        if(score==1){
            label = "POSITIVE"
        }
        else{
            label = "NEGATIVE"
        }
        const review = await Review.findById(reviewId).select("review sentiment")
        if(!review){
            throw new ApiError(501,"review not found")
        }
    
        result.push({reviewId,label,sentiment:review.sentiment,text:review.review})
    }
    if(result.length==0){
        return res
            .json(
                new ApiResponse(501,{},"no restaurant found")
            )
    }
    return res
    .json(
        new ApiResponse(201,result,"Top 10 reviews")
    )
})

const totalReviewCount = asynHandler(async(req,res)=>{
    const countReviews = await connection.zcard("leaderboard:reviews")
    if(countReviews==0){
        return res
            .json(
                new ApiResponse(501,{},"no revies found")
            )
    }
     return res
            .json(
                new ApiResponse(201,countReviews,"Review Count")
            )
})

const topRatedRestaurant = asynHandler(async(req,res)=>{
    const restaurant_redis = await connection.zrevrange("leaderboard:Prestaurant",0,0,"WITHSCORES")
    if(!restaurant_redis){
            return res
            .json(
                new ApiResponse(501,{},"no restaurant found")
            )
    }
    const restaurantId = restaurant_redis[0]
    const reviewCount = restaurant_redis[1]
    const restaurant = await Restaurant.findById(restaurantId).select("owner name restaurantEmail profilePhoto") 
    const result = [restaurant.owner,restaurant.name,restaurant.restaurantEmail,restaurant.profilePhoto,reviewCount]
    return res
    .json(
        new ApiResponse(201,result,"Top Rated Restaurant")
    )
})

const worstRatedRestaurant = asynHandler(async(req,res)=>{
    const restaurant_redis = await connection.zrevrange("leaderboard:Nrestaurant",0,0,"WITHSCORES")
    if(!restaurant_redis){
        return res
        .json(
            new ApiResponse(501,{},"no restaurant found")
        )
    }
    const restaurantId = restaurant_redis[0]
    const reviewCount = restaurant_redis[1]
    const restaurant = await Restaurant.findById(restaurantId).select("owner name restaurantEmail profilePhoto") 
    const result = [restaurant.owner,restaurant.name,restaurant.restaurantEmail,restaurant.profilePhoto,reviewCount]
    return res
    .json(
        new ApiResponse(201,result,"Worst rated Restaurant")
    )
})
export {
    topReviews,
    totalReviewCount,
    topRatedRestaurant,
    worstRatedRestaurant
}