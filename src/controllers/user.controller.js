import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../uti;s/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser=asyncHandler(async(req,res)=>{
    const {fullName,email,username,password}=req.body// express fetch and gives you all fields



    // if(fullname===""){
    //     throw new ApiError(400,"fullName is required")
    // }
    if(
        [fullName,email,username,password].some((field)=>
                field?.trim()==="")
     ){
        throw new ApiError(400,"all fields are required")
     }



     const existedUser=User.findOne({
        $or:[{userName},{email}]
     })
     if(existedUser){
        throw new ApiError(409,"user already exists")
     }
    
//mutler fetches and gives you files access
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalImage=req.files?.coverImage[0].path;

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file needed")
    }


    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalImage)


    if(!avatar){
        throw new ApiError(400,"avatar file needed")
    }


    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        userName:userName.toLowerCase
    })
    //fields which we don't want
    const createdUser=await User.findById(user._id).select(
         "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering user")
    }

    return res.status(201).json(
         new ApiResponse(200,createdUser,message,"user ergistered successfully")  
    )


})

export {registerUser}


//get user details from frontend (here json/raw and form data)
//validation -not empty
//check if user already exists
//check for images,avatar from mutler
//upload them to cloudinary and check again
//create user object - create entry in db
//remove password and refresh token field from response
//check for user creation 
//return res