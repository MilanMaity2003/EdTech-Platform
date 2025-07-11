    const User = require('../models/User');
    const OTP = require('../models/Otp');
    const otpGenerator = require('otp-generator');
    const bcrypt = require('bcrypt');
    const Profile = require('../models/Profile');
    const jwt = require('jsonwebtoken');
    require('dotenv').config();
    exports.sendOTP = async(req, res) =>{
        try{
            const {email} = req.body;
            //check if user is present or not
            const userPresent = await User.findOne({email});

            if(userPresent){
                return res.status(409).json({
                    massage:"User is already exit",
                })
            }

            // generate otp
            const otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars:false,
            });
            // check if otp is unique or not
            const otpPresent = await OTP.findOne({otp: otp});

            while(otpPresent){
                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                otpPresent = await OTP.findOne({otp: otp});
            }
            console.log("Generate otp ", otp);
            const otpPayload = {email, otp};
            const otpBody = OTP.create(otpPayload);
            console.log(otpBody);
            res.status(200).json({
                success: true, 
                massage: " OTP is generated successfully",
            })
        }
        catch(error){
            console.log(error);
            res.status(400).json({
                massage: "Error in generating otp",
            })
        }
    }

    // SIGNUP
    exports.signUp = async(req, res) =>{
        try{
           const{firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body;
           if(!firstName || !lastName || !email || !password || !otp){
            return res.status(400).json({
                massage: "All fills are required"
            });
           }

           if(password !== confirmPassword){
            return res.status(400).json({
                massage: "Password and confirmPassword do not match",
            })
           }

           const existUser = await User.findOne({email});
           if(existUser){
           return  res.status(400).json({
                massage: "User is already exist",
            });
           }

           const recentOTP = await OTP.find({email}).sort({createdAt : -1}).limit(1);
           if(recentOTP.length == 0){
                return res.status(400).json({
                    massage: "OTP not found",
                })
           }
           console.log(recentOTP[0].otp);
            if(otp != recentOTP[0].otp){
            return res.status(400).json({
                massage:"Invalid OTP",
            });
           }
          const hashPassword = await bcrypt.hash(password, 10);


          const profile_details = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: contactNumber,
          });
          
          
          const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            additionalDetails: profile_details._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            accountType,
          });
          return res.status(200).json({
            success: true,
            massage: "User is created successfully",
            user
          });

        }
        catch(error){
            console.log(error);
            res.status(400).json({
                massage: "Error in register"
            });
        }
    }

    // LOGIN
    exports.login = async(req, res) =>{
        try{
            const {email, password} = req.body;
            if(!email || !password){
                return res.status(400).json({
                    massage:"Fill up the from carefully",
                })
            }

            const user = await User.findOne({email}).populate("additionalDetails");
            if(!user){
                return res.status(401).json({
                    massage: "User does not exist",
                })
            }

            if(await bcrypt.compare(password, user.password)){
                const payload = {
                    email: user.email,
                    id : user._id,
                    accountType : user.accountType,
                }

                let token = jwt.sign(payload, process.env.JWT_SECRAT,{expiresIn: "100h",},);
                user.token = token;
                user.password = undefined;
                const option = {
                    expires : new Date( Date.now() + 3*24*60*60*1000),
                    httpOnly: true,
                } 
                res.cookie("token", token, option).status(200).json({
                    success: true,
                    token,
                    user,
                    massage: "Login Successfully",
                });
            }
            else{
                return res.status(403).json({
                    massage: "Incorrect Password",
                });
            }
        }
        catch(error){
            res.status(400).json({
                massage: "Error in Login",
            })
        }
    }
