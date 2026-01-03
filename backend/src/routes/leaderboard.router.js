import {Router} from "express"
import { topReviews,totalReviewCount,topRatedRestaurant,worstRatedRestaurant} from "../controllers/leaderboard.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const leaderboardRouter = new Router()

leaderboardRouter.route("/topReviews").get(verifyJWT,topReviews)
leaderboardRouter.route("/totalReviewCount").get(verifyJWT,totalReviewCount)
leaderboardRouter.route("/topRatedRestaurant").get(verifyJWT,topRatedRestaurant)
leaderboardRouter.route("/worstRatedRestaurant").get(verifyJWT,worstRatedRestaurant)

export default leaderboardRouter
