   const { default: mongoose } = require('mongoose');
const Course = require('../models/Course');
   const RatingAndReview = require('../models/RatingAndReview');

   exports.createRating = async(req, res) =>{
    try{
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;
        // if user enrolled or not
        const courseDetails = await Course.findOne({
                                            _id: courseId,
                                            studentsEnrolled: {$elemMatch:{$eq: userId}},
        });
        if(!courseDetails){
            return res.status(404).json({
                massage: "Student is not enrolled in that course",
            })
        }
        // if student already reviewed 
        const alreadyReview = await RatingAndReview.findOne({
                                                    user: userId,
                                                    course: courseId,
        });
        if(alreadyReview){
            return res.status(403).json({
                massage: "Student already review the course",
            })
        }

        // create rating and review
        const ratingReview = await RatingAndReview.create({rating, review, user: userId, course: courseId});

        // updating course review and rating
        const updateCourse = await Course.findByIdAndUpdate({_id: courseId},
                                                            {
                                                                $push: {
                                                                    ratingAndReview: ratingReview._id,
                                                                }
                                                            },
                                                            {new: true},
        )

        res.status(200).json({
            success: true,
            massage: "Rating and review is created successfully",
            data: ratingReview,
        })
    }
    catch(error){
        res.status(400).json({
            massage:"Error in creating rating and review",
        })
    }
   }

   exports.getAverageRating = async(req, res) =>{
    try{
        const courseId = req.body.courseId;
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id: null,
                    averageRating: {
                        $avg:"$rating",
                    }
                },
            }
        ])

        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }
        return res.status(200).json({
            massage: "Average rating is 0, no rating is given till now",
            averageRating: 0,
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            massage: "Error in getting average rating"
        })
    }
   }

   exports.getAllRatingReview = async(req, res) =>{
    try{
        const ratingReview = await RatingAndReview.find({})
                                                    .sort({rating: "desc"})
                                                    .populate({
                                                        path: "user",
                                                        select: "firstName lastName email image"
                                                    })
                                                    .populate({
                                                        path:"course",
                                                        select: "courseName",
                                                    })
                                                    .exec();
        res.status(200).json({
            success: true,
            massage: "All rating and review is fetched successfully",
            data: ratingReview,
        });                                                    

    }
    catch(error){
        console.log(error);
        res.status(400).json({
            massage: "Error in getting average rating"
        }) 
    }
   }