    const mongoose = require('mongoose');
    require('dotenv').config();

    const DATABASE_URL = process.env.DATABASE_URL;
    const db_connect = () =>{
        mongoose.connect(DATABASE_URL)
        .then(
            console.log("DataBase is connected successfully")
        )
        .catch( (error) =>{
            console.log("Error in conecting database")
            process.exit(1);
        })
    }
    module.exports = db_connect;