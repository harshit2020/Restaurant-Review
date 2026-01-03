import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {restaurantRegister,getUserofRestaurant, editRestaurantofUser} from "../controllers/restaurant.controller.js"
import upload from "../middlewares/multer.middleware.js";

    

const restaurantRouter = Router()

restaurantRouter.route("/registerRestaurant").post(upload.fields([
    {
        name:"restProfilePhoto",
        maxCount:1
    }
]),verifyJWT,restaurantRegister)
restaurantRouter.route("/getUserofRestaurant/:restID").get(verifyJWT,getUserofRestaurant)
restaurantRouter.route("/editRestaurant/:restaurantID").post(upload.none(),verifyJWT,editRestaurantofUser)

export default restaurantRouter