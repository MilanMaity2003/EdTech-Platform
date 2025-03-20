    const Section = require('../models/Section');
    const SubSection = require('../models/SubSection');
    const uploadImageToCloudinary = require('../utils/imageUploader');
    exports.createSubSection = async(req, res) =>{
        try{

            const{sectionId, title, timeDuration, description} = req.body;
            const video = req.files.video;
            if(!sectionId || !title || !timeDuration || !description ){
                return res.status(401).json({
                    massage: "All filds are required",
                })
            }


            const uploadVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            const creatingSubSection = await SubSection.create({
                title: title,
                description: description,
                timeDuration: timeDuration,
                videoUrl: uploadVideo.secure_url,
            });
            const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},{
                $push:{subSection: creatingSubSection._id},
                
            }, {
                new: true,
            })
            res.status(200).json({
            success: true,
            massage: "SubSection is created successfully",
            updatedSection,
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in creating subsection"
            })
            console.log(error);

        }
    }

    exports.updateSubSection = async(req, res) =>{
        try{
            const{subSectionId,sectionId, title, description} = req.body;
            if( !subSectionId || !title || !description){
                return res.status(401).json({
                    massage: "All filds are required",
                })
            }

            const subSectiondetails = {
                title: title,
                description: description,
            }

            if(req.files || req.files.video){
                const video = req.files.videoFile;
                const uploadVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
                subSectiondetails.timeDuration = `${uploadVideo.duration}`;
                subSectiondetails.videoUrl = uploadVideo.secure_url;
            }
            
            
            const updateSubSection = await SubSection.findByIdAndUpdate({subSectionId},{subSectiondetails}, {new: true});

            const updatedSubSection = await Section.findById(sectionId).populate("subSection").exec();
            res.status(200).json({
                
                success: true,
                massage: "SubSection is updated successfully",
                updatedSubSection,
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in updating SubSection",
            })
            console.log(error);
        }
    }

    exports.deleteSubSection = async(req, res) =>{
        try{
            const {subSectionId, sectionId} = req.params;

            
            await Section.findByIdAndUpdate({_id:sectionId}, {
                $pull:{
                    subSection: subSectionId
                }
            })
            await SubSection.findByIdAndDelete(subSectionId);
            const updatedSection = await Section.findById(sectionId).populate("subSection");

            res.status(200).json({
                success: true,
                massage: "SubSection is delted successfully",
                data: updatedSection,
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in deleting subsection",
            })
        }
    }