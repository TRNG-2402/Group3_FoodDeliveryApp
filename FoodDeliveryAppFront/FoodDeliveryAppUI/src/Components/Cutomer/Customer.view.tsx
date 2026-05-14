import { useEffect, useState } from 'react';
import { FoodCard } from '../FoodCard/FoodCard';
import './Customer.style.css';
import type { ICart } from '../../Interfaces/ICart';
import { Button } from '../Button/Button';

// Mock Data replace with API
const food = [
    { id: 1, name: "Burger", price: 12.99, description: "Burgers, Fast Food", img: "image_d9fad9.png", quantity: 0 },
    { id: 2, name: "Pizza", price: 25.75, description: "Pizza, Italian", img: "image_d9fad9.png", quantity: 0 },
    { id: 3, name: "Sushi", price: 37.99, description: "Sushi, Japanese", img: "image_d9fad9.png", quantity: 0 },
    { id: 4, name: "Taco", price: 8.99, description: "Mexican, Tacos", img: "image_d9fad9.png", quantity: 0 },
];

const cartInit: ICart = {
    foodItems: food
}

export const Customer = () => {
    const [cart, setCart] = useState<ICart>(cartInit);
    const [total, setTotal] = useState<number>(0);


    useEffect(() => {
        setTotal(cart.foodItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0))
    }, [cart]);

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    Customer Name
                </div>
                <nav className="nav-links">
                    <div className="nav-item active">Place Order Here</div>
                    <div className="nav-item ">Current Order</div>
                    <div className="nav-item">Previous Orders</div>
                    <div className="nav-item logout">Logout</div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="top-bar">
                    <div className="delivery-info">
                        <span className="pin">📍</span> Deliver to: <strong>Customer Address</strong>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search for food" />
                    </div>
                </header>

                <section className="restaurant-section">
                    <h2 className="menu-title">Delicious Meals Near You:</h2>
                    <div className="restaurant-list">
                        {cart?.foodItems?.map(f => (
                            <FoodCard
                                id={f.id}
                                name={f.name}
                                description={f?.description}
                                price={f.price}
                                quantity={f.quantity}
                                setCart={setCart}
                            />
                        ))}
                    </div>
                </section>

                <div style={{
                    maxWidth: "600px",
                    display: "flex", flexDirection: "column", alignItems: "flex-end"
                }}>
                    <h3>
                        Total: ${total.toFixed(2)}
                    </h3>
                    <Button className="buttonPrimary button-small" onClick={() => {

                    }}>
                        Order
                    </Button>
                </div>



            </main>
        </div>
    );
}

