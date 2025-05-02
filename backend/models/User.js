    const mongoose = require('mongoose');

    const user_Schema = new mongoose.Schema({
        firstName:{
            type:String,
            required: true,
            trim: true,
        },
        lastName:{
            type: String,
            required:true,
            trim: true,
        },
        email:{
            type:String, 
            required: true,
            trim: true,
        },
        password:{
            type:String,
            required: true,
        },
        accountType:{
            type: String,
            enum: ["Admin", "Student", "Instructor"],
            required: true,
        },
        uuid:{
            type: String,
        },
        resetPasswordExpires:{
            type: Date,
        },
        additionalDetails:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"Profile",
        },
        image:{
            type:String,
            required:true,
        },
        courses:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }],
        courseProgress:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress",
        }],
        active:{
            type: Boolean,
            default: true,
        },
        token:{
            type: String,
        },
        approved:{
            type: Boolean,
            default: true,
        },
        accountType:{
            type: String,
        }

    },{timestamps: true});
    module.exports = mongoose.model("User", user_Schema);