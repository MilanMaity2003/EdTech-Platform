    const mongoose = require('mongoose');

    const profile_Schema = new mongoose.Schema({
        gender:{
            type: String,
        },
        dataOfBirth:{
            type: String,
        },
        about:{
            type: String,
            trim: true,
        },
        contactNumber:{
            type: String,
            trim: true,
        }
    })
    module.exports = mongoose.model("Profile", profile_Schema);