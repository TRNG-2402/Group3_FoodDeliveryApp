import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

import './Driver.style.css';
import { Button } from '../../Components/Button/Button';
import { getAllOrders, getAllRestaurants, getCustomerById, getMenuItemsByRestaurantId, getRestaurantById } from './Driver';
import type { IMenuItem } from '../../Interfaces/MenuItem';
import { useNavigate } from 'react-router-dom';
import { MapComponent } from '../../Components/Map/MapComponent';


export const Driver = () => {
    const apikey = import.meta.env.VITE_Google_Map_API_Key;

    const [menu, setMenu] = useState<any>();
    const [customer, setCustomer] = useState<any>();
    const [restaurant, setRestaurant] = useState<any>();
    const [orders, setOrders] = useState<any>();
    const [customerAddress, setCustomerAddress] = useState<string>("");
    const [restaurantAddress, setRestaurantAddress] = useState<string>("");
    const [renderMap, setRenderMap] = useState<boolean>(false);

    useEffect(() => {
        getAllRestaurants()
            .then((r: any) => {
                setRestaurant(r);

                const firstRestaurantId = r[0]?.restaurantId;
                getMenuItemsByRestaurantId(firstRestaurantId)
                    .then((r: IMenuItem[]) => setMenu(r));
            });

        getAllOrders()
            .then((res: any) => {
                const orders = res?.filter((order: any) => order?.status === "Open");
                setOrders(orders);
            })
    }, []);

    const token: string = localStorage.getItem('token')!;

    const navigate = useNavigate();
    !token && navigate("/login");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    useEffect(() => {
        const payload = jwtDecode<any>(token);
        const customerId: number = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        console.log(customerId);
        getCustomerById(customerId)
            .then(r => setCustomer(r));

    }, [])

    useEffect(() => {

    }, [customerAddress, restaurantAddress])


    console.log(restaurant)
    console.log(customer)
    console.log(menu)
    console.log(orders)
    console.log("Customer Address: ", customerAddress)
    console.log("Restaurant Address: ", restaurantAddress)

    return (
        <>

            <div className="dashboard-container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="logo">Turbo Feast</div>
                    <nav className="nav-links">
                        <div className="nav-item active">Open Orders</div>
                        <div className="nav-item" onClick={() => handleLogout()}>Logout</div>
                    </nav>
                </aside>


                <div style={{ display: "flex", flexDirection: "column", width: "250px", alignItems: "center" }}>
                    {
                        orders?.map((order: any) => <div style={{ margin: "10px" }}>
                            <div style={{ border: "1px solid", padding: "5px" }}>Order Id: {order?.orderId}</div>
                            <div style={{ border: "1px solid", padding: "5px" }}>Status: {order?.status}</div>
                            <div style={{ border: "1px solid", padding: "5px" }}>Order Pays: ${(order?.total * 0.15).toFixed(2)}</div>
                            <div style={{ display: "flex" }}>
                                <Button className="buttonOutline" onClick={async () => {
                                    const restaurant: any = await getRestaurantById(order?.restaurantId);
                                    const restaurantAddress: any = restaurant?.address;
                                    const customer: any = await getCustomerById(order?.customerId);
                                    const customerAddress: any = customer?.address;

                                    setRestaurantAddress(restaurantAddress);
                                    setCustomerAddress(customerAddress);

                                    setRenderMap(true);

                                }}>Details</Button>
                                <Button className="buttonPrimary" onClick={() => { }}>Accept</Button>
                            </div>
                        </div>)
                    }
                </div>
                {renderMap && <MapComponent customer={customerAddress} restaurant={restaurantAddress} apikey={apikey} />}


            </div>
        </>

    );
}

