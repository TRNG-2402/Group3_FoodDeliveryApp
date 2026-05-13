import { RestaurantsView } from "./Restaurant.view";

export const Restaurants = () => {
    const restaurants = [
        {
            image: "/images/burger.jpg",
            name: "Burger House",
            category: "Burgers, Fast Food",
            rating: 4.6,
            reviews: "320+",
            time: "30-40 min",
            deliveryFee: "$2.50",
        },
        {
            image: "/images/pizza.jpg",
            name: "Pizza Palace",
            category: "Pizza, Italian",
            rating: 4.4,
            reviews: "250+",
            time: "25-35 min",
            deliveryFee: "$2.00",
        },
        {
            image: "/images/sushi.jpg",
            name: "Sushi World",
            category: "Sushi, Japanese",
            rating: 4.7,
            reviews: "180+",
            time: "40-50 min",
            deliveryFee: "$3.00",
        },
        {
            image: "/images/taco.jpg",
            name: "Taco Town",
            category: "Mexican, Tacos",
            rating: 4.5,
            reviews: "210+",
            time: "20-30 min",
            deliveryFee: "$1.50",
        },
    ];

    return <RestaurantsView restaurants={ restaurants } />;
};