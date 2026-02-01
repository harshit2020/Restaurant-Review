import DashCard from "../components/DashCard.jsx";
export default function Dashboard(){
    return (
        <div className="w-full h-full grid grid-cols-2 bg-gray-800">
            <div>
            <DashCard
                ratedRestaurant = "Top Rated Restaurant"
                profilePhoto = "https://res.cloudinary.com/dn8eefntl/image/upload/v1760086487/iu2bw2aocmkuazwwlkfj.jpg"
                name = "Shadow Maniac"
                topReview = {{
                    name:"Joe Max",
                    review:"Very intereseting will it work ? Lets see."
                }}
                restaurantID = "6t7yuhjR67ftvBJ89yuih"
            />
            </div>
            <div>
            <DashCard
                ratedRestaurant = "Worst Rated Restaurant"
                profilePhoto = "https://res.cloudinary.com/dn8eefntl/image/upload/v1760086487/iu2bw2aocmkuazwwlkfj.jpg"
                name = "Shadow Maniac"
                topReview = {{
                    name:"Joe Max",
                    review:"Very intereseting will it work ? Lets see."
                }}
                restaurantID = "6t7yuhjR67ftvBJ89yuih"
            />
            </div>
        </div>
    );
}