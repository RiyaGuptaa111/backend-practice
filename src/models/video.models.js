import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema(
    {
        videoFile:{
            type:String,
            required:true,

        },
        thumbnail:{
            type:String,
          required:true,
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        duration:{
            type:Number,
            required:true,
        },
        views:{
            type:Number,
            default:0,
        },
        isPublished:{
            Boolean:true,
            default:true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
        },
    },{timestamps:true}
)

videoSchema.plugin(mongooseAggregatePaginate) //Plugins are reusable pieces of code that extend the functionality of Mongoose schemas
// filtering, sorting, grouping
// Pagination is a technique for dividing large datasets into manageable chunks (pages) that are retrieved and displayed to the user one at a time. 
// This is particularly useful for scenarios where you might have a large number of videos in your database, and fetching and displaying all of them at once could be overwhelming or slow.
// By using pagination, you can improve the performance and user experience of your application by loading only the videos that are currently needed on the displayed page.
//  Users can then navigate to other pages to see more videos.

export const Video=mongoose.model("Video",videoSchema)