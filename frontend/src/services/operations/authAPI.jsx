    import {toast} from 'react-hot-toast'
    import { endpoints } from '../apis';
    import { setLoading, setToken } from '../../slices/authSlice';
    import { apiConnector } from '../apiconnector';
    import { setUser } from '../../slices/profileSlice';
    const {SENDOTP_API} = endpoints;
 export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
            console.log(error);
            let errorMessage = "Otp could not be sent";
            if (error.response && error.response.data && error.response.data.massage) {
            errorMessage = error.response.data.massage;
            }
            toast.error(errorMessage);
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}





export function logout(navigate){
  return (dispatch) =>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout successfully");
    navigate("/")
  }
}



// password reset
const {RESETPASSWORD_API} = endpoints;
export function resetPassword(password, confirmPassword, uuid, navigate){
 return async (dispatch) =>{
    const toastId = toast.loading("Loading..");
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("PUT", RESETPASSWORD_API, {
        password, confirmPassword, uuid,
      })
      console.log("Reset password api response ", response);
      const message = response.data.massage;
      toast.success(message);
      navigate('/login')
    }
    catch(error){
      console.log(error);
            let errorMessage = "Password is not reset";
            if (error.response && error.response.data && error.response.data.massage) {
            errorMessage = error.response.data.massage;
            }
            toast.error(errorMessage);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  }
}




// reset password token
const {RESETPASSTOKEN_API} = endpoints;

export function getPasswordResetToken(email,setEmailSent){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
      const response=await apiConnector("POST",RESETPASSTOKEN_API,{
        email
      });
      console.log("RESET PASSWORD TOKEN RESPONSE....",response);
      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error){
      console.log("Reset password token error",error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}