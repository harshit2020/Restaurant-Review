import { Router } from "express";
import {reviewRestaurant,editReview,deleteReview} from "../controllers/review.controller.js"
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
    
    
const reviewRoute = Router()

reviewRoute.route("/createReview/:restaurantId").post(upload.none(),verifyJWT,reviewRestaurant)
reviewRoute.route("/editReview/:reviewId").post(upload.none(),verifyJWT,editReview)
reviewRoute.route("/deleteReview/:reviewId").delete(verifyJWT,deleteReview)

export default reviewRoute