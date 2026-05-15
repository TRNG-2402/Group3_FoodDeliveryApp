import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
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
    const [renderMap, setRenderMap] = useState<boolean>(false);

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
                        <Button className="buttonOutline" onClick={async () => {
                            updateOrder(order?.orderId, {
                                status: "Open", driverId: 1
                            }).then(() =>
                                setCurrentTab("OpenOrders"));
                        }}>Cancel
                        </Button>
                        <Button className="buttonOutline" onClick={async () => {
                            const restaurant: any = await getRestaurantById(order?.restaurantId);
                            const restaurantAddress: any = restaurant?.address;
                            const customer: any = await getCustomerById(order?.customerId);
                            const customerAddress: any = customer?.address;

                            setRestaurantAddress(restaurantAddress);
                            setCustomerAddress(customerAddress);
                            setRenderMap(true);
                        }}>Details
                        </Button>
                        <Button className="buttonPrimary" onClick={() => {
                            updateOrder(order?.orderId, {
                                status: "Delivered", driverId
                            }).then(() =>
                                setCurrentTab("OpenOrders"));
                        }}>Complete Delivery
                        </Button>
                    </div>
                </div>
            }
            )
        }
        {renderMap && <MapComponent customer={customerAddress} restaurant={restaurantAddress} apikey={apikey} />}

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
    </div>
}