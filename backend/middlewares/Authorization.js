const jwt = require('jsonwebtoken');
    require('dotenv').config();

    exports.auth = async(req, res, next) =>{
        try{
            console.log("cookies " + req.cookies.token);
            console.log("header "+ req.header("Authorization") )
            const token = req.body.token || req.cookies.token || req.header("Authorization").replace("bearer ", "") ;
            if(!token || token === undefined){
                return res.status(401).json({
                    massage: "Token is missing"
                })
            }
            try{
                const decode =  jwt.verify(token, process.env.JWT_SECRAT);
                console.log( "decode "+  decode);
                req.user = decode;
                console.log(req.user);
            }
            catch(error){
                console.log(error);
                return res.status(401).json({
                    massage: "Token is invalid",
                })
            }
            next();
        }
        catch(error){
            return res.status(401).json({
                massage:"Something went wrong while validing token",
            })
        }
    }

    exports.isStudent = async(req, res, next)=>{
        try{
            if(req.user.accountType != "Student"){
                return res.status(401).json({
                    massage:"This is a protected route for student",
                })
            }
            next();
        }
        catch(error){
            return res.status(401).json({
                massage:" role is not matched",
            })
        }
    }

    exports.isInstructor = async(req, res, next)=>{
        try{
            if(req.user.accountType != "Instructor"){
                return res.status(401).json({
                    massage:"This is a protected route for Instructor",
                })
            }
            next();
        }
        catch(error){
            return res.status(401).json({
                massage:" role is not matched",
            })
        }
    }

    exports.isAdmin = async(req, res, next) =>{
        try{
            if(req.user.accountType != "Admin"){
                return res.status(401).json({
                    massage:"This is a protected route for Admin"
                })
            }
            next();
        }
        catch(error){
            return res.status(401).json({
                massage:" role is not matched"
            })
        }
    }