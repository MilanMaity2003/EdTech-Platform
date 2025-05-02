    const express = require('express');
    const router = express.Router();

    const {auth, isStudent, isInstructor, isAdmin} = require('../middlewares/Authorization');
    const {getCourseDetails, showAllCourses,createCourse} = require('../controlers/Course');
    const {createCategory, showAllCategory, getCategoryPageDetails} = require('../controlers/Category');
    const {createSection, updateSection, deleteSection} = require('../controlers/Sections');
    const {createSubSection, updateSubSection, deleteSubSection} = require('../controlers/SubSections');
    const {createRating, getAverageRating, getAllRatingReview} = require('../controlers/RatingAndReview');

    // course route
    router.post('/createCourse', auth, isInstructor, createCourse);
    router.get('/showAllCourses',  showAllCourses);
    router.get('/getCourseDetails', getCourseDetails);

    // category route
    router.post('/createCategory', auth, isAdmin, createCategory);
    router.get('/showAllCategory', showAllCategory);
    router.get('/getCategoryPageDetails', getCategoryPageDetails);
    // section route
    router.post('/createSection', auth, isInstructor, createSection);
    router.put('/updateSection', auth, isInstructor, updateSection);
    router.delete('/deleteSection', auth, isInstructor, deleteSection);

    // subsection route
    router.post('/createSubSection', auth, isInstructor, createSubSection);
    router.put('/updateSubSection', auth, isInstructor, updateSubSection);
    router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection);

    // rating route
    router.post('/createRating', auth, isStudent, createRating);
    router.get('/getAverageRating', getAverageRating);
    router.get('/getAllRatingReview', getAllRatingReview);
    module.exports = router;