import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    review:{
        type:String,
        required:true
    },
    sentiment:{
        type:String,
        index:true
    }
},{timestamps:true})

const Review = mongoose.model("Review",reviewSchema)

export default Review
