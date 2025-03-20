    const Course = require('../models/Course');
    const  Category= require('../models/Category');
    const User = require('../models/User');
    const {uploadImageToCloudinary} = require('../utils/imageUploader');
    exports.createCourse = async(req, res) =>{
        try{
            const {courseName, courseDescription, whatYouLearn, price, category} = req.body;
            const thumbnail = req.files.thumbnailImage;

            if(!courseName || !courseDescription || !whatYouLearn || !price || !category || !thumbnail){
                return res.status(400).json({
                    massage: "All fields are required",
                })
            }


            const userId = req.user.id;
            const instructorDetails = await User.findById(userId);
            console.log("Instructor details :", instructorDetails);

            if(!instructorDetails){
                return res.status(404).json({
                    massage: "Instructor details not found",
                })
            }


            const categoryDetails = await Category.findById(category);

            if(!categoryDetails){
                return res.status(404).json({
                    massage: "category details not found",
                })
            }

            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            const newCourse = await Course.create({
                courseName, 
                courseDescription, 
                instructor: instructorDetails._id,
                whatYouLearn: whatYouLearn,
                price,
                category: categoryDetails._id,
                thumbnail: thumbnailImage.secure_url,
            });


            await User.findByIdAndUpdate({
                _id: instructorDetails._id,
            },{
                $push:{courses: newCourse._id},
            }, {new: true},);


            await Category.findByIdAndUpdate({_id:category},
                {
                    $push:{course: newCourse._id}
                },{new : true},
            )

            return res.status(200).json({
                success: true,
                massage: "Course created Successfully",
                data: newCourse,
            })
        }
        catch(error){
            res.status(500).json({
                massage: "Error in creating course",
                error: error.massage,
            })
        }
    }

    // getAllCourse
    exports.showAllCourses = async(req, res) =>{
        try{
            const allCourses = await Course.find({},{courseName: true,
                                                    price: true,
                                                thumbnail: true,
                                            instructor: true,
                                            ratingAndReview: true,
                                            studentsEnrolled: true,
                                        }).populate("instructor").exec();
            return res.status(200).json({
                success: true,
                massage: "All courses data is fetched successfully",
                data: allCourses,
            });
                                                    
        }
        catch(error){
            res.status(500).json({
                massage: " Cannot fetch course data", 
                error: error.massage,
            })

        }
    }

    exports.getCourseDetails = async(req, res) =>{
        try{
            const {courseId} = req.body;
            const courseDetails = await Course.find(
                                                    {_id: courseId})
                                                    .populate(
                                                        {path: "instructor",
                                                        populate:{
                                                            path: "additionalDetails"
                                                        }

                                                        }
                                                    )
                                                    .populate("category")
                                                    .populate("ratingAndReview")
                                                    .populate(
                                                        {
                                                            path: "courseContent",
                                                            populate:{
                                                                path: "subSection"
                                                            }
                                                        }
                                                    ).exec();
          if(!courseDetails){
            return res.status(400).json({
                massage: "course details is not found",
            })
          }
          res.status(200).json({
            massage: "course details is fetched successfully",
            courseDetails,
          })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in finding course details",
            })
        }
    }