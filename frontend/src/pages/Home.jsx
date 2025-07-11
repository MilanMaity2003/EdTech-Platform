import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import CTAButton from "../components/core/HomePage/CTAButton";
import banner from "../assets/Images/banner.mp4"
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
const Home = () => {
    return(
        <div>
           {/* section 1 */}

           <div className="  mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between ">
                <Link to={"/signup"}>

                    <div className=" group  mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200  transition-all duration-200 hover:scale-95 w-fit">
                        <div className=" flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>

            <div className=" text-center text-4xl font-semibold mt-7">
            Empower Your Future with 
                <HighlightText text = {"Coding Skills"}/>
            </div>

            <div className=" mt-4 w-[90%] text-center text-lg  text-richblack-300">
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>


            <div className=" flex flex-col lg:flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
            </div>

            
            <div className=" mx-3 my-12 shadow-blue-200">
                <video
                muted
                loop
                autoPlay>
                <source src= {banner} type="video/mp4"></source>

                </video>
            </div>

            {/* code section 1 */}

            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className=" text-4xl font-semibold">
                            Unlock your 
                            <HighlightText text={"coding potential "} />
                             with our online courses.
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={
                        {
                            btnText: "Try it yourself",
                            active: true,
                            linkto: "/signup"
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            active: false,
                            linkto: "/login"
                        }
                    }
                    codeblock = {`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css"> \n </head> \n <body>\n <h1><a href="/">Header</a>\n </h1>\n<nav><a href="/one">One</a><a href="/two">Two</a>\n<a href="/three">Three</a></nav> \n </body>`}
                    codeColor={" text-yellow-25"}
                />

            </div>

            {/* code section 2 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className=" text-4xl font-semibold">
                            Start 
                            <HighlightText text={"coding in Seconds "} />
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            active: true,
                            linkto: "/signup"
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            active: false,
                            linkto: "/login"
                        }
                    }
                    codeblock = {`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css"> \n </head> \n <body>\n <h1><a href="/">Header</a>\n </h1>\n<nav><a href="/one">One</a><a href="/two">Two</a>\n<a href="/three">Three</a></nav> \n </body>`}
                    codeColor={" text-yellow-25"}
                />

            </div>

            {/* Explore More  */}
            <ExploreMore/>

           </div>

           {/* section2 */}

           <div className=" bg-pure-greys-5 text-richblack-700 ">
                    <div className=" homepage_bg h-[333px]">
                        <div className=" w-11/12 max-w-maxContent flex items-center justify-center  gap-5 mx-auto mt-8  pt-24 ">
                        <div className=" h-[250px]"></div>
                            <CTAButton active={true} linkto={"/siguup"}>
                                <div className=" flex items-center gap-3 ">
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div className=" text-white">
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>

                    <div className=" mt-10 mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-7">
                        <div className=" flex gap-5 mb-10 ">
                            <div className=" font-inter font-semibold w-[45%] text-4xl">
                                Get the Skills you need for a 
                                <HighlightText text={"job that is in demand"}/>
                            </div>
                            <div className=" flex flex-col gap-10 w-[40%] items-start">
                                <div className=" text-[16px]">
                                    <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                                </div>
                                <div>
                                    <CTAButton active={true} linkto={"/signup"}>
                                        Learn More
                                    </CTAButton>
                                </div>

                            </div>
                        </div>
                        
                        <TimeLineSection/>
                    <LearningLanguageSection/>
                    </div>

                    
           </div>


            {/* section 3 */}

            <div className=" w-11/12 mx-auto max-w-maxContent flex-col items-center  justify-between gap-8 bg-richblack-900 text-white mt-10">
                    <InstructorSection/>
                    <h2 className=" text-center text-4xl font-semibold mt-10">
                        Review from Other Learners
                    </h2>
            </div>

            <Footer/>

        </div>
    )
}
export default Home;