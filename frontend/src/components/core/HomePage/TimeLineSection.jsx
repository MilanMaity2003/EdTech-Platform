 import React from 'react'
 import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
 import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
 import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
 import timeLineImage from "../../../assets/Images/TimelineImage.png"
 import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
 let timeLine = [
    {
        logo: logo1,
        heading: "Leadership", 
        description: "Fully committed to the success company"
    },
    {
        logo: logo2,
        heading: "Responsibility", 
        description: "Students will always be our top priority"
    },
    {
        logo: logo3,
        heading: "Flexibility", 
        description: "The ability to switch is an important skills"
    },
    {
        logo: logo4,
        heading: "Solve the problem", 
        description: "Code your way to a solution"
    }
 ]
 
 const TimeLineSection = () => {
   return (
     <div>
        <div className=' flex flex-row gap-15 items-center'>
            <div className=' w-[45%] flex flex-col gap-5 '>
                {
                    timeLine.map( (element, index) =>{
                        return(
                            <div className=' flex flex-row gap-6' key = {index}>

                                <div className=' w-[50px] h-[50px] bg-white flex items-center rounded-full justify-center'>
                                    <img src={element.logo} />
                                </div>
                                <div>
                                    <h2 className=' font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className = ' text-base'>{element.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className=' relative shadow-blue-200'>
                <img src= {timeLineImage}/> 

                <div className=' absolute bg-caribbeangreen-700 flex text-white uppercase py-7 px-7
                  left-[18%] translate-x-[-10%]  translate-y-[-40%]'>
                    <div className=' flex gap-5 items-center border-r pr-5 border-caribbeangreen-300'>
                        <p className = ' text-3xl font-bold'>10</p>
                        <p className = ' text-caribbeangreen-300 text-sm'> Year of Experience</p>
                    </div>

                    <div className=' flex gap-5 items-center px-7'>
                    <p className = ' text-3xl font-bold'>250</p>
                    <p className = ' text-caribbeangreen-300 text-sm'>Type of Course</p>
                    </div>
                </div>
            </div>


        </div>
     </div>
   )
 }
 
 export default TimeLineSection