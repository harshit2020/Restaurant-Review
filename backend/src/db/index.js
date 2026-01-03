import mongoose from "mongoose";

const connectDB = async() => {
    try{
       const dbConnection = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
       console.log(`Connection to db successful ${dbConnection.connection.host}`)
    }
    catch(error){
        console.log("Connection to DB failed")
        throw error
    }
}

export default connectDB