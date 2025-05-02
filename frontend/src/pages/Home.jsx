import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import CTAButton from "../components/core/HomePage/CTAButton";
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


            <div className=" flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
            </div>

            
            {/* <div className=" mx-3 -my-12 shadow-blue-200">
                <video
                muted
                loop
                autoPlay>
                <source src="" type="video/mp4"></source>

                </video>
            </div> */}

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
                            btnText: "Try it yourself",
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

           </div>

           {/* section2 */}
        </div>
    )
}
export default Home;