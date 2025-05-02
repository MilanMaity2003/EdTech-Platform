const express = require('express');
const app = express();
require("dotenv").config();
app.use(express.json());
const PORT = process.env.PORT || 7000;
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db_connect = require('./config/database');
const {connectCloudinary} = require('./config/cloudinary');
const userRoutes = require('./routes/User');
// const paymentRoutes = require('./routes/Payment');
const profieRoutes = require('./routes/Profile');
const courseRoutes = require('./routes/Course');
const corsOptions = {
    origin: "https://localhost:5173",
    methods: "GET, PUT, POST, DELETE, PATCH, HEAD",
    Credential: true,
};
app.use(cors(corsOptions));
db_connect();
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(cookieParser());
app.use('/api/v1/auth', userRoutes);
// app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/profile', profieRoutes);
app.use('/api/v1/course', courseRoutes);
connectCloudinary();
app.listen(PORT, () =>{
    console.log(`App is connected successfully at port no : ${PORT}`);
});
app.get('/', (req, res) =>{
    return res.json({
        success: true, 
        message: "Your server is up and running"
    })
})
