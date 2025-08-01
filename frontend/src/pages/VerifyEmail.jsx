import OTPinput from "react-otp-input"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";
import Spinner from "../components/common/Spinner";
import {toast} from "react-hot-toast"
import { endpoints } from "../services/apis";
import { apiConnector } from "../services/apiconnector";
    import { setLoading } from "../slices/authSlice";
    import { sendOtp } from "../services/operations/authAPI";

const VerifyEmail=()=>{
  const {loading,signupdata}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const [otp,setOtp]=useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    if(!signupdata){
      navigate("/signup");
    }
  });

    // signup api
    const {SIGNUP_API} = endpoints;
    async function signup(accountType, firstName, lastName, email,password, confirmPassword, otp ){
        const toastId = toast.loading("Loading..");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType, firstName, lastName, email, password, confirmPassword, otp 
            })
            console.log("sign up api response ", response);
            const message = response.data.massage;
            toast.success(message);
            navigate("/login")
        }
        catch(error){
           console.log(error);
            let errorMessage = "Otp could not be sent";
            if (error.response && error.response.data && error.response.data.massage) {
            errorMessage = error.response.data.massage;
            }

            toast.error(errorMessage); 
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupdata;
    signup(accountType, firstName, lastName, email, password, confirmPassword, otp);
  }
  return (
    <div class="text-white flex items-center justify-center flex-col h-[calc(100vh-56px)]">
      {
        loading?
        (
          <Spinner/>
        )
        :(
          <div className="max-w-[330px]  flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Verify Email</h1>
            <p className="mb-4 text-[13px] leading-1 text-[#9e9ea0]">A verification code has been sent to you. Enter the code below.</p>
            <form  onSubmit={handleOnSubmit}>
              <OTPinput
               className=" w-full p-6 bg-richblack-600 text-white"
              value={otp}
              onChange={setOtp}
              numInputs={6}
              
              renderSeparator={<span className="text-richblack-900">-</span>}
              renderInput={(props) => <span className="rounded-xl mx-auto px-[16px] py-[8px]   bg-richblack-800"><input   {...props} className=" bg-richblack-800  "/></span>}
              />
              <button className={`w-full hover:bg-[#f4d744] active:scale-[0.95] transition-all duration-200 bg-[#FFD60A] text-richblack-900 mt-8 rounded-lg font-semibold text-xs p-3`}  type="submit">
                Verify Email
              </button>    
            </form>

            <div  className="flex mt-2 justify-between items-center ">
              
                <Link className="flex text-richblack-25 justify-center items-center " to="/login">
                  <IoIosArrowRoundBack fontSize={25} />
                  <p className="text-xs font-semibold">Back to login</p>
                </Link>
              


                <button  className="flex gap-1 text-[#47A5C5] justify-center items-center " onClick={()=>dispatch(sendOtp(signupdata.email,navigate))}>
                <FaClockRotateLeft fontSize={15}/>
                <p  className="text-xs font-semibold">Resend it</p> 
                </button>
            </div>
          </div>
        )

      }
    </div>
  );
}
export default VerifyEmail;