import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    restaurantEmail:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        required:true
    }
    
},{timestamps:true})

const Restaurant = mongoose.model("Restaurant",restaurantSchema)

export default Restaurant