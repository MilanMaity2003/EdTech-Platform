    const mongoose = require('mongoose');
    const mailSender = require('../utils/mailSender');

    const mailTemplate = require('../mail/template/emailVerificationTemplate');
    const OTP_Schema = new mongoose.Schema({
        email:{
            type: String,
        },
        otp:{
            type: Number,
        },
        createdAt:{
            type: Date,
            default: Date.now(),
            expires: 5*60,
        },
    });

    async function sendVarificationEmail(email, otp){
        try{
            const emailResposnse = mailSender(email,"Verification email from stydyLab", mailTemplate(otp));
            console.log("Email is send successfuly ", emailResposnse.response);
        }
        catch(error){
            console.log("Error occur while sending the email", error);
            throw error;
        }
        
    }

    OTP_Schema.pre("save", async function(next){
        sendVarificationEmail(this.email, this.otp);
        next();
    })

    module.exports = mongoose.model("Otp", OTP_Schema);