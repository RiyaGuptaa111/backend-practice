import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import {upload} from "../middlewares/multer.middleware.js"
const router=Router()

//avatar and cover image
router.route("/register").post(
    upload.fields([
        {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),
    registerUser)


export default router