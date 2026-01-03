import app from "./app.js"
import connectDB from "./db/index.js";
import connection from "./utils/redisConnection.js";

//mongo db
const dbConnect = async () => {
    await connectDB()
    .then(()=>{
        app.listen(process.env.PORT)
        console.log(`Server is running at port ${process.env.PORT}`)
    })
    .catch((error)=>{
        console.log("Failed to connect to MongoDB")
        throw error
    })

    //redis
    connection.on("connect", () => {
    console.log("Redis connected");
    });

    connection.on("ready", () => {
    console.log("Redis ready to use");
    });

    connection.on("error", (err) => {
    console.error("Redis error", err);
    });
}

dbConnect()

// Access Token by verifying refresh token generator, Cloudinary setup ,routes, controllers

