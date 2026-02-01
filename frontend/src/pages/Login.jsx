import { useState } from "react"
import {Link} from "react-router"
import axios from "axios"


export default function Login(){
    const [formData,setFormData] = useState({
        username:"",
        password:"",
        remember:""
    })

    const handleChange =(e)=>{
        const {name,value,type,checked} = e.target
        setFormData(prev =>({
            ...prev,
            [name]:type == "checkbox" ? checked : value
        }))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/api/v1/users/loginUser",
                {
                    username:formData.username,
                    password:formData.password,
                    remember:false
                },
                {withCredentials:true} 
            );
            console.log("Login successfull !!",response.data)
        }
        catch(error){
            console.log(error.response?.data || error.message)
        }
    }
    return (
        <div  className = "w-full  bg-gray-950 flex  justify-center items-center">
            <div className="bg-gray-950  flex flex-col justify-center items-center rounded-xl ring-2 ring-violet-500 shadow-xl shadow-violet-500">
                <h1 className="text-4xl font-bold p-10 text-white text-shadow-md text-shadow-violet-500">LOGIN</h1>
                <form onSubmit={handleSubmit}>
                   <div className="flex flex-col gap-2 px-10">
                        <label htmlFor="username" className="text-white">Username:</label>
                        <input type="text" name ="username" value = {formData.username} onChange={handleChange} className="rounded-xl px-3 outline-2 outline-white text-white opacity-90" placeholder=" Enter your name" id = "username" required/>
                        
                        <label htmlFor="password" className="text-white">Password:</label>
                        <input type="password" name = "password" value = {formData.password} onChange={handleChange} className="rounded-xl px-3 outline-2 outline-white text-white opacity-90" placeholder=" Password@1234" id = "password" required/>
                   </div>
                   <div className="px-10 pt-8 pb-4">
                        <label htmlFor="remember" className="text-sm text-white pr-2">Remember me:</label>
                        <input type="checkbox" value = {formData.remember} onChange={handleChange}  id = "remember" className=" hover:cursor-pointer scale-90 accent-violet-500"/>
                        <Link to="/forgot-password" name = "remember" className="text-sm text-white pl-4 hover:text-violet-300 hover:underline">Forgot password?</Link>
                   </div>
                   <div className="flex justify-center items-center p-5">
                        <button type = "submit" className="bg-violet-600 shadow-lg rounded-2xl text-white px-3 py-2 text-md hover:bg-violet-700 hover:shadow-violet-500/50 transition-all duration-200 cursor-pointer">Submit</button>
                   </div>
                </form>
            </div>
        </div>
    );
}