    const {instance} = require('../config/razorpay');
    const Course = require('../models/Course');
    const User = require('../models/User');
    const mailSender = require('../utils/mailSender');
    const {courseEnrollmentEmail} = require('../mail/template/courseEnrollmentEmail');
    const mongoose = require('mongoose');

    exports.paymentCapture = async(req, res) =>{
        const {course_id} = req.body;
        const userId = req.user.id;
        if(!course_id){
            return res.status(401).json({
                massage: "course_id is not present",
            })
        }
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(401).json({
                    massage: "course is not present",
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    massage: "Student is already enrolled",
                })
            }

        }
        catch(error){
            res.status(400).json({
                massage: "Error in finding course",
            })
            console.log(error);
        }
        // order create
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount*100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId : course_id,
                userId,
            }
        }
        try{
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            res.status(200).json({
                success: true,
                massage: "Payment instance is created successfully",
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            });
        }
        catch(error){
            res.status(400).json({
                massage: "Error in creating instance",
            })
        }
    }

    // verify signature of razorpay and server
    exports.verifySignature = async(req, res) =>{
        const webHookSecret = "123456789";
        const signature = req.headers["x-razorpay-signature"];
        const shasum = crypto.createHmac("sha256", webHookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(signature == digest){
            console.log("Signature is verified successfully");
            const {courseId, userId} = req.body.payload.payment.entity.notes;
        try{
            const enrolledCourse = await Course.findOneAndUpdate(
                                        {_id: courseId },
                                        {$push: {studentsEnrolled: userId}},
                                        {new: true},
            )
            if(!enrolledCourse){
                return res.status(400).json({
                    massage: "Courese is not found",
                })
            }
            console.log(enrolledCourse);

            const enrolledStudent = await User.findOneAndUpdate(
                                            {_id: userId},
                                            {$push:{courses: courseId}},
                                            {new: true},
            );
            console.log(enrolledStudent);
            const emailResponse = await mailSender(enrolledStudent.email,
                                                    "congratulation, from studyLab","You onboarded into studyLab course"
            )
            res.status(200).json({
                success: true,
                massage: "Course is enrolled successfully",
                enrolledStudent,
            });
        }
        catch{
            res.status(400).json({
                massage: "Error in enrolled course",
            })
            console.log(error);
        }
    }
    }