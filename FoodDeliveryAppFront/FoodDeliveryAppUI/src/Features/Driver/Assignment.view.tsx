import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { ConfirmModal } from '../../Components/ConfirmModal/ConfirmModal';
import { getCustomerById, getOrderByDriverId, getRestaurantById, updateOrder } from "./Driver";
import type { IOrder } from "../../Interfaces/Interfaces";
import { Button } from "../../Components/Button/Button";
import { MapComponent } from "../../Components/Map/MapComponent";


interface driver {
    driverId: number;
    assignments: IOrder[];
    setAssignments: Dispatch<SetStateAction<IOrder[]>>;
    setCurrentTab: Dispatch<SetStateAction<"OpenOrders" | "Assignments">>;
}

export const Assignment = ({ driverId, assignments, setAssignments, setCurrentTab }: driver) => {
    const apikey = import.meta.env.VITE_Google_Map_API_Key;

    const [previousAssignments, setPreviousAssignments] = useState<IOrder[]>([]);
    const [customerAddress, setCustomerAddress] = useState<string>("");
    const [restaurantAddress, setRestaurantAddress] = useState<string>("");
    const [confirm, setConfirm] = useState({ open: false, title: "", message: "", onConfirm: () => {}, confirmLabel: "Confirm", danger: false });

    const openConfirm = (title: string, message: string, onConfirm: () => void, confirmLabel = "Confirm", danger = false) =>
        setConfirm({ open: true, title, message, onConfirm, confirmLabel, danger });
    const closeConfirm = () => setConfirm(c => ({ ...c, open: false }));

    useEffect(() => {
        getOrderByDriverId(driverId)
            .then((response: any) => {
                const assignments = response.filter((order: IOrder) => order.driverId === driverId && order.status === "Delivering");
                setAssignments(assignments);
                const previous = response.filter((order: IOrder) => order.driverId === driverId && order.status === "Delivered");
                setPreviousAssignments(previous);
            });
    }, []);

    console.log(assignments);

    return <div>
        <h3>Current Assignments</h3>
        {
            assignments?.length === 0 && <div>You have no active assignments.</div>
        }
        {
            assignments?.map((order: IOrder) => {
                return <div style={{ margin: "10px" }}>
                    <div style={{ border: "1px solid", padding: "5px" }}>Order Id: {order?.orderId}</div>
                    <div style={{ border: "1px solid", padding: "5px" }}>Status: {order?.status}</div>
                    <div style={{ border: "1px solid", padding: "5px" }}>Order Pays: ${(order?.total * 0.15).toFixed(2)}</div>
                    <div style={{ display: "flex" }}>
                        <Button className="buttonOutline" onClick={() => {
                            openConfirm(
                                "Cancel Delivery",
                                `Cancel order #${order?.orderId}? It will return to Open status.`,
                                () => updateOrder(order?.orderId, { status: "Open", driverId: 1 })
                                    .then(() => setCurrentTab("OpenOrders")),
                                "Cancel Delivery",
                                true
                            );
                        }}>Cancel
                        </Button>
                        <Button className="buttonOutline" onClick={async () => {
                            const restaurant: any = await getRestaurantById(order?.restaurantId);
                            const restaurantAddress: any = restaurant?.address;
                            const customer: any = await getCustomerById(order?.customerId);
                            const customerAddress: any = customer?.address;

                            setRestaurantAddress(restaurantAddress);
                            setCustomerAddress(customerAddress);
                        }}>Details
                        </Button>
                        <Button className="buttonPrimary" onClick={() => {
                            openConfirm(
                                "Complete Delivery",
                                `Mark order #${order?.orderId} as delivered?`,
                                () => updateOrder(order?.orderId, { status: "Delivered", driverId })
                                    .then(() => setCurrentTab("OpenOrders")),
                                "Complete Delivery"
                            );
                        }}>Complete Delivery
                        </Button>
                    </div>
                </div>
            }
            )
        }
        <MapComponent customer={customerAddress} restaurant={restaurantAddress} apikey={apikey} />

        <h3>Previous Assignments</h3>
        {
            previousAssignments?.length === 0 && <div>You have no completed orders.</div>
        }
        {
            previousAssignments?.map((order: IOrder) =>
                <div style={{ margin: "10px" }}>
                    <div style={{ border: "1px solid", padding: "5px" }}>Order Id: {order?.orderId}</div>
                    <div style={{ border: "1px solid", padding: "5px" }}>Status: {order?.status}</div>
                    <div style={{ border: "1px solid", padding: "5px" }}>Order Pays: ${(order?.total * 0.15).toFixed(2)}</div>
                </div>)
        }
        <ConfirmModal
            isOpen={confirm.open}
            title={confirm.title}
            message={confirm.message}
            confirmLabel={confirm.confirmLabel}
            danger={confirm.danger}
            onConfirm={() => { confirm.onConfirm(); closeConfirm(); }}
            onCancel={closeConfirm}
        />
    </div>
}