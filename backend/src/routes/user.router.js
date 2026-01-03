import { Router } from "express";
import {registerUser,loginUser,logoutUser} from "../controllers/user.controller.js"
import upload from "../middlewares/multer.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const userRouter = Router()

userRouter.route("/registerUser").post(upload.fields(
   [{
        name: "profilePhoto",
        maxCount:1
    }]
),registerUser)
userRouter.route("/loginUser").post(upload.none(),loginUser)
userRouter.route("/logoutUser").post(upload.none(),verifyJWT,logoutUser)
//userRouter.route("/refreshAccessToken").post(refreshAccessToken)

export default userRouter

