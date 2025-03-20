    const mongoose = require('mongoose');

    const section_Schema = new mongoose.Schema({
        sectionName:{
            type: String,
        },
        subSection:[
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "SubSection",
            }
        ],
    })
    module.exports = mongoose.model("Section", section_Schema);