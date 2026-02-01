import {Link} from "react-router"
export default function Signup(){
    return (
        <div  className = "w-full  bg-gray-950 flex  justify-center items-center">
            <div className="bg-gray-950  flex flex-col justify-center items-center rounded-xl ring-2 ring-violet-500 shadow-xl shadow-violet-500">
                <h1 className="text-4xl font-bold p-10 text-white text-shadow-md text-shadow-violet-500">SIGN UP</h1>
                <form>
                   <div className="flex flex-col gap-2 px-10">
                        <label htmlFor="username" className="text-white">Username:</label>
                        <input type="text" className="rounded-xl px-3 outline-2 outline-white text-white opacity-90" placeholder=" Enter your name" id = "username" required/>
                   </div>
                    <div className="flex flex-col gap-2 px-10 py-5">
                        <label htmlFor="password" className="text-white">Password:</label>
                        <input type="password" className="rounded-xl px-3 outline-2 outline-white text-white opacity-90" placeholder=" Password@1234" id = "password" required/>
                   </div>
                    <div className="flex flex-col gap-2 px-10">
                        <label htmlFor="password" className="text-white">Confirm Password:</label>
                        <input type="password" className="rounded-xl px-3 outline-2 outline-white text-white opacity-90" placeholder=" Password@1234" id = "password" required/>
                   </div>
                   <div className="flex justify-center items-center p-5">
                        <button type = "submit" className="bg-violet-600 shadow-lg rounded-2xl text-white px-3 py-2 text-md hover:bg-violet-700 hover:shadow-violet-500/50 transition-all duration-200 cursor-pointer">Submit</button>
                   </div>
                </form>
            </div>
        </div>
    );
}