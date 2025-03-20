    const mongoose = require('mongoose');

    const category_Schema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        course:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course",
        },]
    })
    module.exports = mongoose.model("Category", category_Schema);