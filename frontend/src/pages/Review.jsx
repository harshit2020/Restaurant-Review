export default function Review(){
    const topReview = {
        name: "Joe",
        review: [
            "Nice place",
            "Food was amazing",
            "Will visit again"
        ]
    }

    const profilePhoto = "https://res.cloudinary.com/dn8eefntl/image/upload/v1760086487/iu2bw2aocmkuazwwlkfj.jpg"
    const name = "The god restaurant"
    const owner = "Smiling Maniac" 
    const email = "sdev@#i9ho.restro.in"
    return(
        <div className="  w-full min-h-[80vh] grid grid-cols-2 bg-gray-800 p-10 rounded-2xl">
            <div className="grid grid-rows-[0.2fr_2fr_1fr] ">
                    <div className="flex  items-center justify-center flex-col ">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white">{name}</h1>
                    </div>
                    <div className="flex  items-center justify-center">
                        <img src={profilePhoto} alt = "profile" className="w-48 h-48 sm:w-56 sm:h-56md:w-64 md:h-64 rounded-xl object-cover ring-2 ring-violet-500"/>
                </div>
                <div className="outline-1 outline-violet-500 shadow-md shadow-violet-700">
                    <h2 className="text-white px-5 py-1 text-2xl font-bold">Reviews :</h2>
                    <h3 className="text-white px-5 py-1 text-xl font-bold">{topReview.name}</h3>
                    <ul className="text-white px-5 py-1 ">
                        {topReview.review.map((item,index) =>{
                            return(<li key={index} className="text-white text-sm md:text-lg">{item}</li>);
                        })}
                    </ul>
                </div>
            </div>

            <div className="grid grid-rows-[2fr_1fr]">
                <div className="flex flex-col  items-center justify-center">
                    <h2 className="text-2xl md:text-4xl p-3 font-extrabold text-white">Add Your Review :</h2>
                    <form className="p-10">
                        <div className="pt-10 w-auto">
                            <textarea type="text" className="text-white h-32 p-3 w-84 bg-gray-700 rounded-2xl overflow-auto" placeholder="Write your review..."/>
                        </div>
                        <br></br>
                        <button type = "submit" className="bg-violet-600 w-full  shadow-lg  rounded-2xl text-white px-3 py-2 text-md hover:bg-violet-700 hover:shadow-violet-500/50 transition-all duration-200 cursor-pointer">Submit</button>
                    </form>
                </div>
                <div className="flex flex-col items-center ">
                    
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold pb-5 text-white">Restaurant Contact info :</h1>
                        <h3 className="text-xl md:text-2xl font-bold p-2 text-white">Restaurant Name :{" "}<span className="text-xl md:text-2xl font-normal p-2 text-white">{name}</span> </h3>
                        <h3 className="text-xl md:text-2xl p-2 font-bold text-white">Owner Name :{" "}<span className="text-xl md:text-2xl font-normal p-2 text-white">{owner}</span></h3>
                        <h3 className="text-xl md:text-2xl p-2 font-bold text-white">Email id : {" "}<span className="text-xl md:text-2xl font-normal p-2 text-white">{email}</span></h3>
                    </div>
                </div>
            </div>
        </div>
    );
}