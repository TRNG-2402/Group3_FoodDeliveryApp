import { useEffect, useState } from 'react';
import './Customer.style.css';
import type { ICart } from '../../Interfaces/ICart';
import { FoodCard } from '../../Components/FoodCard/FoodCard';
import { Button } from '../../Components/Button/Button';
import { getAllMenuItems } from './Customer';
import type { IMenuItem } from '../../Interfaces/MenuItem';

// Mock Data replace with API
const food = [
    { menuItemId: 1, name: "Burger", price: 12.99, description: "Burgers, Fast Food", imageURL: "image_d9fad9.png", quantity: 0 },
    { menuItemId: 2, name: "Pizza", price: 25.75, description: "Pizza, Italian", imageURL: "image_d9fad9.png", quantity: 0 },
    { menuItemId: 3, name: "Sushi", price: 37.99, description: "Sushi, Japanese", imageURL: "image_d9fad9.png", quantity: 0 },
    { menuItemId: 4, name: "Taco", price: 8.99, description: "Mexican, Tacos", imageURL: "image_d9fad9.png", quantity: 0 },
];

const cartInit: IMenuItem[] = [];

export const Customer = () => {
    const [menu, setMenu] = useState<any>();
    const [cart, setCart] = useState<IMenuItem[]>(cartInit);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        getAllMenuItems()
            .then((r: IMenuItem[]) => {
                setMenu(r);
            })
    }, []);

    console.log(cart);

    useEffect(() => {
        setTotal(cart.reduce((acc, cur) => acc + cur.price * (cur.quantity ?? 0), 0))
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
                        {menu?.map((m: IMenuItem) => (
                            <FoodCard
                                key={m.menuItemId}
                                id={m.menuItemId}
                                name={m.name}
                                description={m?.description}
                                price={m.price}
                                quantity={m?.quantity ?? 0}
                                cart={cart}
                                setCart={setCart}
                                imageURL={m.imageURL}
                            />
                        ))}
                    </div>
                </section>

                <div style={{
                    maxWidth: "600px",
                    display: "flex", flexDirection: "column", alignItems: "flex-end"
                }}>
                    {
                        cart?.map(e => (
                            <h3>{e.name} x{e.quantity} .................... ${(e.price * (e?.quantity ?? 1)).toFixed(2)}</h3>
                        ))
                    }
                    <h3>Tax.................... ${(total * 0.0875).toFixed(2)}</h3>
                    <h3>Delivery Fee.................... $3.00</h3>
                    -------------------------------------------
                    <h3>
                        Total.................... ${(total * 1.0875 + 3.00).toFixed(2)}
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

