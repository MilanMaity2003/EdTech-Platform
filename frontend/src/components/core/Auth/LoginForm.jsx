import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {apiConnector} from "../../../services/apiconnector"
  import {endpoints} from "../../../services/apis"
import toast from "react-hot-toast"
import { setToken, setLoading } from '../../../slices/authSlice'
import { setUser } from "../../../slices/profileSlice"
function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // login api
  const {LOGIN_API} = endpoints;
  async function login(email, password){
    const toastId = toast.loading("Loading..");
    dispatch(setLoading(true));
    try{
        const response = await apiConnector("POST", LOGIN_API,{email,password})
        console.log("login api response ", response);
        const message = response.data.massage;
        toast.success(message);
        dispatch(setToken(response.data.token))
        localStorage.setItem("token", JSON.stringify(response.data.token));
        const userImage = response.data?.user?.image ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({...response.data.user, image: userImage}))
        localStorage.setItem("user", JSON.stringify(response.data.user));
         navigate("/dashboard/user-profile");

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

  // handle subbimssion form
  const handleOnSubmit = (e) =>{
    e.preventDefault();
    login(email, password);
  }

  return (
    <form onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm