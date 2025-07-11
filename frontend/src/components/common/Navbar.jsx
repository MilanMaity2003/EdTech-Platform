import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png';
import {Link, matchPath, useLocation} from 'react-router-dom';
import { NavbarLinks } from '../../data/navbarLinks';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FaCartPlus } from "react-icons/fa6";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const {token} = useSelector((state) => state.auth);
  const user = useSelector((state) => state.profile.user)
  const {totalItems} = useSelector((state) => state.cart);
  const location = useLocation();

  // // fetching category 
  const [subLinks, setSubLinks] = useState([]);
  const fetchSublinks =  async() =>{
      try{
        const result = await apiConnector("GET",categories.CATEGORIES_API)
        console.log( result.data.allCategory);
        console.log("user ", user);
        setSubLinks(result.data.allCategory);
      }
      catch(error){
        console.log("Could not fetch the category list")
      }
    }


  useEffect( () =>{
      fetchSublinks();
  }, []);

  const matchRoute = (route) =>{
    return !!matchPath({path: route}, location.pathname);
  }


  return (
    <div className=' h-14 border-b-[1px] border-b-richblack-700'>
        <div className=' flex w-11/12 max-w-maxContent items-center justify-between'>
        {/* image */}
            <Link to= "/">
                <img src={logo} />
            </Link>

    {/* navLink */}

            <nav>
              <ul className = 'flex gap-x-6 text-richblack-25'>
              {
                NavbarLinks.map((link, index) =>{
                  return <li key={index}>
                      {
                        link.title == "Catalog" ? (
                        <div className= {` group  relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                            <p>{link.title}</p>
                            <MdKeyboardArrowDown/>
                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                             <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                              {
                                subLinks.map( (subLink, key)=>(
                                  <Link to={`/catalog/${subLink.name.split(" ").join("_").toLowerCase()}`} key={key}
                                  className=' rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' >
                                      <p>{subLink.name}</p>
                                  </Link>
                                ))
                              }
                            </div>
                        </div>):
                        <Link to={link?.path}>
                           <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
  {link.title}
</p>

                        </Link>
                      }
                  </li>
                })
              }

              </ul>
            </nav>


              {/* login/signup/dashboard */}

              <div className=' flex gap-x-4 items-center'>
              
              {

                user && user.accountType != "Instructor" && (
                  <Link to = "/dashboard/cart" className='relative text-white'>
                    <FaCartPlus/>
                    {
                      totalItems > 0 &&(
                        <span>
                          {totalItems}
                        </span>
                      )
                    }
                  </Link>
                )
              }


              {
                token === null && (
                  <Link to = "/login">
                    <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                      Log in
                    </button>
                  </Link>
                )
              }

              {
                token === null && (
                  <Link to= "/signup">
                    <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                      SignUp
                    </button>
                  </Link>
                )
              }

              {
                token !== null && <ProfileDropDown/>
              }

              </div>

        </div>
    </div>
  )
}

export default Navbar