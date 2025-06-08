import React,{useState} from 'react'
import Passwordinput from '../../components/input/Passwordinput'
import { Link, useNavigate } from "react-router-dom"
import { validateEmail } from '../../utils/helper'
import Navbar from '../../components/Navbar'
import axios from "axios"
import { toast } from "react-toastify"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

    const navigate=useNavigate()
const handleSignup=async(e) =>{
  e.preventDefault()

  if(!name){
    setError("Please enter your name")
    return
  }

  if(!validateEmail(email)){
    setError("Please enter a valid email address")
    return
  }
  if(!password){
    setError("Please enter the psssword")
    return
  }
  setError("")

  //signup api
  try {
      const res = await axios.post(
        "https://backend-deployment-r1co.onrender.com/api/auth/signup",
        { username: name, email, password },
        { withCredentials: true }
      )


      if (res.data.success === false) {
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)

      setError("")

      navigate("/login")
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
      setError(error.message)
    }
  }

    

  return (
    <>
    
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center '  style={{ backgroundImage: "url('/bg.jpeg')" }}>

      {/* Blur Overlay */}
    <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
    <div className="relative z-10 flex items-center justify-center min-h-screen">
    <div className='w-96 rounded-2xl bg-white px-7 py-10 shadow-xl bg-opacity-90'>
        <form onSubmit={handleSignup}>
            <h4 className='text-2xl mb-7'>SIGN UP</h4>
            
            <input 
            type='text' 
            placeholder='name'
            className='input-box'
            value={name} 
            onChange={(e) => setName(e.target.value)}/>

            <input 
            type='text' 
            placeholder='email'
            className='input-box'
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>

            <Passwordinput
            value={password}
           onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
             <Link
              to={"/login"}
              className="font-medium text-[#2B85FF] underline"
            >
              Login
            </Link>
            
          </p>

        </form>
        </div>
    </div>
    </div>
    </>
  )
}

export default Signup
