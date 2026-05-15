import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { ConfirmModal } from '../../Components/ConfirmModal/ConfirmModal';

import './Driver.style.css';
import { Button } from '../../Components/Button/Button';
import { getAllOrders, getAllRestaurants, getCustomerById, getMenuItemsByRestaurantId, getRestaurantById, updateOrder } from './Driver';
import type { IMenuItem } from '../../Interfaces/MenuItem';
import { useNavigate } from 'react-router-dom';
import { MapComponent } from '../../Components/Map/MapComponent';
import { Assignment } from './Assignment.view';
import type { IOrder } from '../../Interfaces/Interfaces';


export const Driver = () => {
    const apikey = import.meta.env.VITE_Google_Map_API_Key;
    console.log("apikey", apikey);
    const [menu, setMenu] = useState<any>();
    const [driver, setDriver] = useState<any>();
    const [restaurant, setRestaurant] = useState<any>();
    const [orders, setOrders] = useState<IOrder[]>();
    const [assignments, setAssignments] = useState<IOrder[]>([]);
    const [customerAddress, setCustomerAddress] = useState<string>("");
    const [restaurantAddress, setRestaurantAddress] = useState<string>("");
    const [renderMap, setRenderMap] = useState<boolean>(false);
    const [currentTab, setCurrentTab] = useState<"OpenOrders" | "Assignments">("OpenOrders");
    const [confirm, setConfirm] = useState({ open: false, title: "", message: "", onConfirm: () => {}, confirmLabel: "Confirm", danger: false });

    const openConfirm = (title: string, message: string, onConfirm: () => void, confirmLabel = "Confirm", danger = false) =>
        setConfirm({ open: true, title, message, onConfirm, confirmLabel, danger });
    const closeConfirm = () => setConfirm(c => ({ ...c, open: false }));

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
                const orders = res?.filter((order: any) => order?.status === "Pending");
                setOrders(orders);
            })
    }, [currentTab]);

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
            .then(r => setDriver(r));

    }, [])

    useEffect(() => {

    }, [customerAddress, restaurantAddress])


    console.log(restaurant)
    console.log(driver)
    console.log(menu)
    console.log(orders)
    console.log("Customer Address: ", customerAddress)
    console.log("Restaurant Address: ", restaurantAddress)
    console.log("Assignments: ", assignments);

    useEffect(() => {

    }, [renderMap]);

    return (
        <>
            <div className="dashboard-container">
                <aside className="sidebar">
                    <div className="logo">Turbo Feast</div>
                    <nav className="nav-links">
                        <div className="nav-item active" onClick={() => { setCurrentTab("OpenOrders") }}>Open Orders</div>
                        <div className="nav-item" onClick={() => { setCurrentTab("Assignments") }}>Assignments</div>
                        <div className="nav-item" onClick={() => openConfirm("Log Out", "Are you sure you want to log out?", handleLogout, "Log Out", true)}>Logout</div>
                    </nav>
                </aside>

                {currentTab === "Assignments" &&
                    <Assignment
                        driverId={driver?.userId}
                        assignments={assignments}
                        setAssignments={setAssignments}
                        setCurrentTab={setCurrentTab}
                    />}

                {currentTab === "OpenOrders" &&
                    <><div style={{ display: "flex", flexDirection: "column", width: "250px", alignItems: "center" }}>
                        <h2>Open Orders</h2>
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
                                    <Button className="buttonPrimary" onClick={() => {
                                        openConfirm(
                                            "Accept Order",
                                            `Accept order #${order?.orderId}? You will be assigned as the driver.`,
                                            () => updateOrder(order?.orderId, { status: "Delivering", driverId: driver?.userId })
                                                .then(() => setCurrentTab("Assignments")),
                                            "Accept"
                                        );
                                    }}>Accept</Button>
                                </div>
                            </div>)
                        }
                    </div>
                         <MapComponent customer={customerAddress} restaurant={restaurantAddress} apikey={apikey} />
                    </>
                }

            </div>
            <ConfirmModal
                isOpen={confirm.open}
                title={confirm.title}
                message={confirm.message}
                confirmLabel={confirm.confirmLabel}
                danger={confirm.danger}
                onConfirm={() => { confirm.onConfirm(); closeConfirm(); }}
                onCancel={closeConfirm}
            />
        </>

    );
}

