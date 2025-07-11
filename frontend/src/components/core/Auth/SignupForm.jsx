import React, { useState } from 'react'
 import {toast} from 'react-hot-toast'
 import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
 import { useDispatch } from 'react-redux'
 import {useNavigate} from 'react-router-dom'
 import { setSignupdata, setLoading } from '../../../slices/authSlice'
 import { ACCOUNT_TYPE } from '../../../utils/Constant'
 import Tab from '../../common/Tab'
  import {apiConnector} from "../../../services/apiconnector"
  import {endpoints} from "../../../services/apis"
  import { sendOtp } from '../../../services/operations/authAPI'
const SignupForm = () => {

  const navigate = useNavigate();
  
  const dispatch = useDispatch();


  // acount type
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({firstName: "", lastName: "", email:"",
    password: "",confirmPassword: "",
  })

  const handleOnChange = (e) =>{
    setFormData( (prevData) =>({
      ...prevData,
      [e.target.name] : e.target.value,
    }))
  }

  const tabData = [
    {
      id: 1, 
      tabName: "Student", 
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor", 
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
const { firstName, lastName, email, password, confirmPassword } = formData


    // sending email api call

    // const {SENDOTP_API} = endpoints;
    // async function sendOtp(email) {
    //   const toastId = toast.loading("Loading..");
    //   dispatch(setLoading(true));
    //   try{
    //     const response = await apiConnector("POST", SENDOTP_API, {email})
    //     console.log("otp api response " , response);
    //     const message = response.data.massage;
    //     console.log(message);
    //     toast.success(message);
    //     navigate("/verify-email");
    //   }
    //   catch(error){
    //     console.log(error);
    // let errorMessage = "Otp could not be sent";
    
    // // Check if backend sent a custom error message
    // if (error.response && error.response.data && error.response.data.massage) {
    //   errorMessage = error.response.data.massage;
    // }

    // toast.error(errorMessage);
    //   }
    //   toast.dismiss(toastId);
    //   dispatch(setLoading(false));
    // }






     
    // handle submission form
    const handleOnSubmit = (e) =>{
      e.preventDefault();

      if(password !== confirmPassword){
        toast.error("Passwords do not match")
        return ;
      }

      const signupData = {
        ...formData,
        accountType
      }
      dispatch(setSignupdata(signupData))
      dispatch(sendOtp(email, navigate));

    }





  return (
    <div>
      {/* // tab */}

      <Tab tabData={tabData} field = {accountType}  setField={setAccountType}/>


    {/* form  */}

    <form onSubmit={handleOnSubmit} className=' flex w-full flex-col gap-y-4'>
    <div className=' flex gap-x-4'>
      <label>
        <p className = " mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          First Name <sup className = "text-pink-200">*</sup>
        </p>
        <input type='text' name='firstName' 
          placeholder='Enter first name'
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          required
          onChange={handleOnChange}
          className=' w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 '
        />
      </label> 

      <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label> 
            <div className=' flex gap-x-4'>
              <label className=' relative'>
                  <p className = 'mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    Create Password <sup className= ' text-pink-200'>*</sup>
                  </p>

                  <input
                    type= {showPassword ? "text" : "password"}
                    name='password'
                    onChange={handleOnChange}
                    placeholder='Enter Password'
                    style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              required
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                  />
                  <span onClick = { () => setShowPassword((prev) => !prev)}
                  className = "absolute right-3 top-[38px] z-[10] cursor-pointer">
                    {
                      showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                      )
                      :(
                        <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                      )
                    }
                  </span>
              </label>
              <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setshowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
            </div>

              <button type='submit'
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
              > 
              Create Account</button>
    </form>
    </div>
  )
}

export default SignupForm