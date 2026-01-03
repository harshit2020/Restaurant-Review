import { Worker } from "bullmq";
import axios from "axios";
import Review from "../model/review.model.js"
import connection from "../utils/redisConnection.js"
import connectDB from "../db/index.js";
import app from "../app.js"

console.log("DB_URI = ",process.env.DB_URI)
await connectDB()
    .then(()=>{
        app.listen(process.env.PORT_WORKER)
        console.log(`Server is running at port ${process.env.PORT_WORKER}`)
    })
    .catch((error)=>{
        console.log("Failed to connect to MongoDB")
        throw error
    })

const ML_API_URL = "http://localhost:8000/analyze";

const worker = new Worker(
  "review-ml",
  async (job) => {
    console.log("Processing job:", job.name);

    if (job.name == "analyze-review") {
      const { reviewId, text } = job.data;
      const res = await axios.post(ML_API_URL, {
        text
      });
      console.log("reviewID = ",reviewId)
      const label = res.data;
      const scoreMap = {
        "POSITIVE":1,
        "NEGATIVE":-1
      }
  
      const score = scoreMap[label]

      const updateReveiw = await Review.findById(reviewId)
      updateReveiw.sentiment = label
      await updateReveiw.save({validateBeforeSave:false})

      await connection.zadd("leaderboard:reviews",score,reviewId)
      console.log("Leaderboard required : ",reviewId,score)

      if(score == 1){
        await connection.zincrby("leaderboard:Prestaurant",1,updateReveiw.restaurant)
      }
      else{
        await connection.zincrby("leaderboard:Nrestaurant",1,updateReveiw.restaurant)
      }
      console.log("Review analyzed:", reviewId);

      return label;
    }
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});
