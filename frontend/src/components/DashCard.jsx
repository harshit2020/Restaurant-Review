import { Link } from "react-router";
export default function DashCard({profilePhoto,name,topReview,restaurantID,ratedRestaurant}){
    return (
        <div className="  w-full min-h-[80vh] flex flex-col justify-center items-center gap-6 bg-gray-800 p-10 rounded-2xl">
            <h1 className="text-5   xl md:text-5xl font-bold text-white">{ratedRestaurant}</h1>
            <h1 className="text-2xl md:text-2xl font-extrabold text-white">{name}</h1>
            <img src={profilePhoto} alt = "profile" className="w-48 h-48 sm:w-56 sm:h-56md:w-64 md:h-64 rounded-xl object-cover ring-2 ring-violet-500"/>
            
            <div className="outline-1 outline-violet-500 shadow-md shadow-violet-700">
                <h2 className="text-white px-5 py-1 text-xl font-bold">Reviews :</h2>
                <h3 className="text-white px-5 py-1 font-bold">{topReview.name}</h3>
                <p className="text-white px-5 py-1 ">{topReview.review}</p>
            </div>
            <div>
                <Link to={`/Review/${restaurantID}`} className="flex justify-center px-5 py-1 items-center text-white bg-violet-700 hover:bg-violet-900 rounded-xl">
                    Read more..
                </Link>
            </div>
        </div>
    );
}