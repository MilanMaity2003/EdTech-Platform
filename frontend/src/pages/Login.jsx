import React from 'react'
import loginImg from "../assets/Images/login.webp"
import Template from '../components/core/Auth/Template'
const Login = () => {
  return (
    <div ><Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    /></div>
  )
}

export default Login