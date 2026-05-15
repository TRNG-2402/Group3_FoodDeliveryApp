import { FaStar, FaChevronRight } from "react-icons/fa";
import "./RestaurantCard.style.css";

interface IRestaurantCard {
    image: string;
    name: string;
    category: string;
    rating: number;
    reviews: string;
    time: string;
    deliveryFee: string;
}

export const RestaurantCard = ({
    image,
    name,
    category,
    rating,
    reviews,
    time,
    deliveryFee,
}: IRestaurantCard) => {
    return (
        <div className="restaurantCard">
            <img className="restaurantImage" src={image} alt={name} />

            <div className="restaurantInfo">
                <h3>{name}</h3>
                <p>{category}</p>

                <div className="restaurantMeta">
                    <span>
                        <FaStar className="starIcon" /> {rating} ({reviews})
                    </span>
                    <span>•</span>
                    <span>{time}</span>
                    <span>•</span>
                    <span>{deliveryFee} Delivery</span>
                </div>
            </div>

            <FaChevronRight className="arrowIcon" />
        </div>
    );
};