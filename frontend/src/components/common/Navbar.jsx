import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png';
import {Link, matchPath, useLocation} from 'react-router-dom';
import { NavbarLinks } from '../../data/navbarLinks';
const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) =>{
    return !!matchPath({path: route}, location.pathname);
  }
  return (
    <div className=' h-14 border-b-[1px] border-b-richblack-700'>
        <div className=' flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to= "/">
                <img src={logo} />
            </Link>

            <nav>
              <ul className = 'flex gap-x-6 text-richblack-25'>
              {
                NavbarLinks.map((link, index) =>{
                  return <li key={index}>
                      {
                        link.title == "Catalog" ? (<div></div>):
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
        </div>
    </div>
  )
}

export default Navbar