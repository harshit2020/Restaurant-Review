import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String,

    }
    
},{timestamps:true})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password  = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    const token = jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        },
    )
    return token
}

userSchema.methods.generateRefreshToken = async function(){
        const token = jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        },
    )
    return token
}


const User = mongoose.model("User",userSchema)

export default User