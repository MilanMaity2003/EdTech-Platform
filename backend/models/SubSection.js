    const mongoose = require('mongoose');

    const SubSection_Schema = new mongoose.Schema({
        title:{
            type: String,
        },
        timeDuration:{
            type: String,
        },
        description:{
            type: String,
        },
        videoUrl:{
            type: String,
        }
    })
    module.exports = mongoose.model("SubSection", SubSection_Schema);