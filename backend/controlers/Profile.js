    const User = require('../models/User');
    const Profile = require('../models/Profile');

    exports.updateProfile = async(req, res) =>{
        try{
            const {dateOfBirth, about = "", gender, contactNumber } = req.body;
            const id = req.user.id;
            if(!contactNumber || !gender || !id){
                return res.status(401).json({
                    massage: "All filds are requird",
                })
            }
            const user = await User.findById(id);
            const profileId = user.additionalDetails;
            const profile = {
                dateOfBirth: dateOfBirth,
                about: about,
                gender: gender,
                contactNumber: contactNumber,
            }
            const updatingProfile = await Profile.findByIdAndUpdate(profileId, profile, {new: true});
            res.status(200).json({
                success: true,
                massage: "Profile is updated successfully",
                updatingProfile,
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in updating profile",
            })
            console.log(error);
        }
    }
    exports.deleteAccount = async(req, res) =>{
        try{
            const id = req.user.id;
            const user = await User.findById(id);
            if(!user){
                return res.status(401).json({
                    massage: "User does not exist",
                })
            }
            await Profile.findByIdAndDelete({_id: user.additionalDetails});
            await User.findByIdAndDelete({_id:id});
            res.status(200).json({
                success: true, 
                massage: "User is deleted successfully",
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in deleting user",
            })
            console.log(error);
        }
    }

    exports.getAllUserDetails = async(req, res) =>{
        try{
            const id = req.user.id;
            const userDetails = await User.findById(id).populate("additionalDetails").exec();
            res.status(200).json({
                success: true,
                massage: "User details is fetched successfully",
                userDetails,
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in fetching user details",
            })
            console.log(error);
        }
    }