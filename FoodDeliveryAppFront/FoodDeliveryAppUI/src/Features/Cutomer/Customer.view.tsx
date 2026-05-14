import { useEffect, useState } from 'react';
import { jwtDecode, type JwtPayload } from "jwt-decode";

import './Customer.style.css';
import type { ICart } from '../../Interfaces/ICart';
import { FoodCard } from '../../Components/FoodCard/FoodCard';
import { Button } from '../../Components/Button/Button';
import { getAllMenuItems, getAllRestaurants, getCustomer, getMenuItemsByRestaurantId, postOrder } from './Customer';
import type { IMenuItem } from '../../Interfaces/MenuItem';
import { useNavigate } from 'react-router-dom';

const cartInit: IMenuItem[] = [];

export const Customer = () => {
    const [menu, setMenu] = useState<any>();
    const [cart, setCart] = useState<IMenuItem[]>(cartInit);
    const [total, setTotal] = useState<number>(0);
    const [customer, setCustomer] = useState<any>();
    const [restaurant, setRestaurant] = useState<any>();

    useEffect(() => {
        getAllRestaurants()
            .then((r: any) => {
                setRestaurant(r);
            });

        // getAllMenuItems()
        //     .then((r: IMenuItem[]) => {
        //         setMenu(r);
        //     })
    }, []);

    console.log(cart);

    useEffect(() => {
        setTotal(cart.reduce((acc, cur) => acc + cur.price * (cur.quantity ?? 0), 0))
    }, [cart]);

    const token: string = localStorage.getItem('token')!;
    console.log(token);

    const navigate = useNavigate();
    !token && navigate("/login");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    console.log(token && jwtDecode(token));
    console.log(token && jwtDecode<JwtPayload>(token))


    useEffect(() => {
        const payload = jwtDecode<any>(token);
        const customerId: number = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        console.log(customerId);
        getCustomer(customerId)
            .then(r => setCustomer(r));

    }, [])



    console.log(cart);
    console.log(restaurant)
    console.log(customer)
    console.log(menu)

    return (
        <>

            <div className="dashboard-container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="logo">Turbo Feast</div>
                    <nav className="nav-links">
                        <div className="nav-item active">Place Order Here</div>
                        <div className="nav-item ">Active Order</div>
                        <div className="nav-item">Previous Orders</div>
                        <div className="nav-item" onClick={() => handleLogout()}>Logout</div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    <header className="top-bar">
                        <div className="delivery-info">
                            <strong>{customer?.name}</strong><br></br>
                            <span className="pin">📍</span>
                            <strong>{customer?.address}</strong>
                        </div>
                        <div className="search-bar">
                            <input type="text" placeholder="Search for food" />
                        </div>
                    </header>

                    <section className="restaurant-section">
                        <h2 className="menu-title">Delicious Meals Near You:</h2>
                        {
                            restaurant?.map((res: any) => {
                                return <button
                                    onClick={() => {
                                        setCart([]);
                                        getMenuItemsByRestaurantId(res?.restaurantId)
                                            .then(r => {
                                                console.log(r)
                                                setMenu(r);
                                            })
                                    }}
                                >{res?.name} {res?.address}</button>
                            })
                        }
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

                            const items = cart?.map(c => {
                                return {
                                    menuItemId: c?.menuItemId,
                                    quantity: c?.quantity,
                                    unitPrice: c?.price
                                }
                            })

                            postOrder({
                                "customerId": customer?.userId,
                                "restaurantId": menu[0]?.restaurantId,
                                items
                            })
                                .then(r => console.log(r));

                        }}>
                            Order
                        </Button>
                    </div>



                </main>
            </div>
        </>

    );
}

