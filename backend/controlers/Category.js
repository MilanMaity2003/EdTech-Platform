    const Category = require('../models/Category');

    exports.createCategory = async(req, res) =>{
        try{
            const {name, description} = req.body;

            if(!name || !description){
                return res.status(400).json({
                    massage: "All fildes are required",
                })
            }
            const tagDetails = await Category.create({
                name: name,
                description: description,
            })
            console.log(tagDetails);
            return res.status(200).json({
                success: true,
                massage: "Tag is created successfully",
            })
        }
        catch(error){
            res.status(400).json({
                massage: "Error in creating tag",
            })

        }
    }

    exports.showAllCategory = async(req, res) =>{
        try{
            const allCategory = await Category.find({},{name: true, description: true});
            res.status(200).json({
                success: true,
                massage: "All tags returned successfully",
                allCategory,
            })
        }
        catch(error){
            res.status(500).json({
                massage: error.massage,
            })
        }
    }

    exports.getCategoryPageDetails = async(req, res) =>{
        try{
            const {categoryId} = req.body;
            // get specific category courses
            const courses = await Category.findById(categoryId)
                                            .populate({
                                                path: "course",
                                                // match: {status:"Published"},
                                                populate: ([{path: "instructor"},{path: "ratingAndReview"}])
                                            })
                                            .exec();
         if(!courses){
            return res.status(404).json({
                massage: "Data not found",
            })
         }                                
         
         const differentCourse = await Category.find({
                                            _id: {$ne: categoryId}
                                            })
                                            .populate("course")
                                            .exec();

                // Get top selling course
                const allCategoryCourses = await Category.find({})
                                            .populate({
                                                path: "course",
                                                // match: {status:"Published"},
                                                populate: ([{path: "instructor"},{path: "ratingAndReview"}])
                                            })
                                            .exec();
               const allCourses = allCategoryCourses.flatMap((category) => category.course);
               const mostSellingCourse = allCourses.sort((a,b) => b.sold - a.sold).slice(0,10);                                        
            res.status(200).json({
                success: true, 
                massage: "Category page details is fetched successfully",
                data:{
                    specificCategory: courses,
                    differentCategor: differentCourse,
                    mostSellingCourse: mostSellingCourse,
                }
            });
        }

        catch(error){
            console.log(error);
            res.status(400).json({
                massage: "Error in category page details",
            })
        }
    }