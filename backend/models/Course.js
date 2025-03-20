    const mongoose = require('mongoose');

    const course_Schema = new mongoose.Schema({
        courseName:{
            type:String,
        },
        courseDescription:{
            type: String,
            trim: true,
        },
        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        whatYouLearn:{
            type:String,
        },
        courseContent:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }],
        ratingAndReview:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }],
        price:{
            type: Number,
        },
        thumbnail:{
            type:String,
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
        },
        studentsEnrolled:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },],
        status:{
            type: String,
            enum: ["Draft", "Published"]
        }
    }
)
    module.exports = mongoose.model("Course", course_Schema);