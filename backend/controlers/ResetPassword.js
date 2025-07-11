    const User = require('../models/User');
    const mailSender = require('../utils/mailSender');
    const bcrypt = require('bcrypt');
    // resetPasswordToken
    exports.resetPasswordToken = async(req, res, next) =>{
       try{
        const email = req.body.email;
        const user = await User.findOne({email: email});
        if(!user){
            return res.json({
                massage:"Your email is not registered with us",
            })
        }
        const uuid = crypto.randomUUID();
            const updatedDetails = await User.findOneAndUpdate({email: email},{
                                                    uuid: uuid,
                                                    resetPasswordExpires: Date.now() + 5*60*1000,
            },
        {new: true});
        const url = `http://localhost:5173/update-password/${uuid}`
        await mailSender(email, 
            "Password Reset Link",
            `Password Reset Link: ${url}`
        );
        return res.json({
            success: true,
            massage: "Email sent successfully",
        })
       }
       catch(error){
            res.status(400).json({
                massage: "Error in reset password",
            })
       }
    }

    // reset Password
    exports.resetPassword = async(req, res) =>{
        try{
            const {password, confirmPassword, uuid} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({
                massage:"Password not matching",  
            });
        }

        const userDetails = await User.findOne({uuid: uuid});
        if(!userDetails){
            return res.status(400).json({
                massage: "Token is invalid",
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                massage: "Token is expired, please reegenerate your token"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({uuid: uuid},
            {password: hashPassword},
            {new : true},
        );
        return res.status(200).json({
            success: true,
            massage: "Password updated successfully",
        });
        }
        catch(error){
            res.status(400).json({
                massage: "Error in updating password"
            })
        }


    }