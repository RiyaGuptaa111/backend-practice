import mongoose, {Schema} from "mongoose";
import { jwt } from "jsonwebtoken";//provide data/password to anybody asking for access
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
        userName:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true ,//easily searchable in db
        },
        
            email:{
                type:String,
                required:true,
                unique:true,
                lowercase:true,
                trim:true,
            },
            fullName:{
                type:String,
                required:true,
                index:true,
                trim:true,
            },
            avatar:{
                type:String,//clodinary url
                required:true,
            },
            coverImage:{
                type:String,
            },
            watchHistory:{
                type:Schema.Types.ObjectId,
                ref:"Video"
            },
            password:{
                type:String,
                required:[true,"password is required"],
            },
            refreshToken:{
                type:String,
            },
    },{timestamps:true}
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10)
    next()
})//as it is middleware so use next
//checking whether password is correct
userSchema.methods.isPasswordCorrect= async function
(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
        _id:this._id,  
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:REFRESH_TOKEN_EXPIRY
    }
)
}


export const User=mongoose.model(User,"userSchema")

//bcryp can encrypt and check passwords
//encrypts user data(payloads) like id email