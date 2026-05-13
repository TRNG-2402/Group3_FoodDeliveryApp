import "./Restaurant.style.css";
import { FaLocationDot } from "react-icons/fa6";
import { FiSearch, FiSliders } from "react-icons/fi";
import { RestaurantCard } from "./../../Components/RestaurantCard/RestaurantCard";

import { Sidebar } from "../../Components/Sidebar/Sidebar";

interface IRestaurant {
    image: string;
    name: string;
    category: string;
    rating: number;
    reviews: string;
    time: string;
    deliveryFee: string;
}

interface IRestaurantsView {
    restaurants: IRestaurant[];
}

export const RestaurantsView = ({ restaurants }: IRestaurantsView) => {
    return (
        <div className="restaurantsPage">
            <Sidebar />

            <main className="restaurantsMain">
                <div className="restaurantsHeader">
                    <div className="deliveryBox">
                        <FaLocationDot className="locationIcon" />

                        <div>
                            <p>Deliver to</p>
                            <h4>123 Main Street, City</h4>
                        </div>
                    </div>

                    <div className="searchBox">
                        <FiSearch className="searchIcon" />
                        <input type="text" placeholder="Search for restaurants or cuisines" />
                    </div>

                    <button className="filterButton">
                        <FiSliders />
                    </button>
                </div>

                <section className="restaurantsSection">
                    <h2>All Restaurants</h2>

                    <div className="restaurantsList">
                        {restaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.name}
                                image={restaurant.image}
                                name={restaurant.name}
                                category={restaurant.category}
                                rating={restaurant.rating}
                                reviews={restaurant.reviews}
                                time={restaurant.time}
                                deliveryFee={restaurant.deliveryFee}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};