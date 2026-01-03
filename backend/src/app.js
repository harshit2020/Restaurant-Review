import express from 'express'
import cors from 'cors'

import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true    
}))
app.use(cookieParser())

//Router imports
import userRouter from "./routes/user.router.js"
import restaurantRouter from "./routes/restaurant.router.js"
import reviewRouter from "./routes/review.router.js"
import leaderboardRouter from './routes/leaderboard.router.js'
//Router settings
app.use("/api/v1/users",userRouter)
app.use("/api/v1/restaurant",restaurantRouter)
app.use("/api/v1/review",reviewRouter)
app.use("/api/v1/leaderboard",leaderboardRouter)

export default app