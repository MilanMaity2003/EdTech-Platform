import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepageExplore'
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'
const tabName = [
    "Free", 
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
]
const ExploreMore = () => {

  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
  const setMyCards = (value) =>{
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  }
  return (
    <div>
       <div className=' text-4xl  font-semibold text-center'>
          Unlock the
          <HighlightText text={"Power of Code"}/>
       </div> 

      <p className = ' text-center text-richblack-300 text-sm text-[16px] mt-3 '>Learn to build anything you can imagine</p>

      <div className=' flex gap-8 rounded-full bg-richblack-800  mb-5 border-richblack-100
      px-4 py-1 mt-7'>
        {
          tabName.map((element, index) =>{
            return (
              <div className={`text-[16px] flex flex-row items-center gap-2
              ${currentTab === element ? " bg-richblack-900 text-richblack-5 font-medium rounded-full px-7 py-2" 
              : "text-richblack-200 rounded-full  transition-all duration-200  cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2" }`} 
              key={index}
              onClick={() => setMyCards(element)}>
                {element}
              </div>
            )
          })
        }
      </div>
      
      <div className=' lg: h-[150px]'></div>

        {/* cards */}
          <div className='  absolute flex flex-col lg:flex-row gap-12 justify-between  -translate-y-32  -translate-x-20 ' >
              {
                courses.map((element, index) =>{
                  return (
                    <div>
                      <CourseCard key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                      />
                    </div>
                  )
                })
              }
          </div>


      

    </div>
  )
}

export default ExploreMore