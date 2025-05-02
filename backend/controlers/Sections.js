    const Course = require('../models/Course');
    const Section = require('../models/Section');

    exports.createSection = async(req, res) =>{
        try{

            const {sectionName, courseId} = req.body;
            if(!sectionName || !courseId){
                return res.status(401).json({
                    massage: "All fillds are required",
                })
            }
            const newSection = await Section.create({sectionName});
            const updatedCourse = await Course.findByIdAndUpdate(courseId,
                                                                {
                                                                    $push:{
                                                                       courseContent: newSection._id, 
                                                                    }
                                                                },
                                                                {new: true},
            )
            res.status(200).json({
                success: true,
                massage: "Section is created successfully", 
               newSection,
            })
        }
        catch(error){
            console.log( "error is " + error);
            res.status(400).json({
                massage: "Error in creating section",
            })
        }
    }
    exports.updateSection = async(req, res) =>{
        try{
            const {sectionName, sectionId} = req.body;
            if(!sectionName || !sectionId){
                return res.status(401).json({
                    massage: "All filds are required",
                })
            }
            const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});
            res.status(200).json({
                success: true,
                massage: "Section is updated successfully",
                section
            })

        }
        catch(error){
            res.status(400).json({
                massage: "Error in updating section",
            });
            console.log(error);

        }
    }

    exports.deleteSection = async(req, res) =>{
        try{
            const {sectionId,courseId} = req.body;
            await Section.findByIdAndDelete(sectionId);
            const updatedCourse = await Course.findByIdAndUpdate(courseId,
                {
                    $pull:{
                       courseContent: sectionId, 
                    }
                },
                {new: true},
)
            res.status(200).json({
                success: true,
                massage: "Section is deleted successfully",
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in deleting section",
            })
            console.log(error);

        }
    }