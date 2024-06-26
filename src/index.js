// import mongoose from "mongoose";
// import {DB_NAME} from "./constants";
// import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is runnig at port :${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongodb connection failed !!!",err);
})







// const app=express()

// ( async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log(("ERRR",error));
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);

//         })
//     }catch(error){
//         console.log("ERROR:",error);
//         throw err
//     }
// })
// ()