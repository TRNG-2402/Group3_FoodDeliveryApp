import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { AddMenuItem } from "../MenuItem/MenuItem.view";
import type { IMenuItem } from "../../Interfaces/MenuItem";
import {
    deleteMenuItem,
    getMenuItemsByRestaurant,
    updateMenuItem,
} from "../MenuItem/MenuItem";
import "./Restaurant.style.css";

const RESTAURANT_ID = 3;

export const Restaurant = () => {
    const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);

    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editImageURL, setEditImageURL] = useState("");

    const loadMenuItems = async () => {
        try {
            setLoading(true);
            const data = await getMenuItemsByRestaurant(RESTAURANT_ID);
            setMenuItems(data);
        } catch (error) {
            console.error("Failed to load menu items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMenuItems();
    }, []);

    const handleEditClick = (item: IMenuItem) => {
        setEditingItemId(item.menuItemId);
        setEditName(item.name);
        setEditDescription(item.description ?? "");
        setEditPrice(String(item.price));
        setEditImageURL(item.imageURL ?? "");
    };

    const handleCancelEdit = () => {
        setEditingItemId(null);
        setEditName("");
        setEditDescription("");
        setEditPrice("");
        setEditImageURL("");
    };

    const handleUpdate = async (id: number) => {
        if (!editName || !editPrice) {
            alert("Name and price are required.");
            return;
        }

        try {
            await updateMenuItem(id, {
                name: editName,
                description: editDescription,
                price: parseFloat(editPrice),
                imageURL: editImageURL,
            });

            handleCancelEdit();
            loadMenuItems();
        } catch (error) {
            console.error("Failed to update menu item:", error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;

        try {
            await deleteMenuItem(id);
            loadMenuItems();
        } catch (error) {
            console.error("Failed to delete menu item:", error);
        }
    };

    return (
        <div className="restaurantOwnerPage">
            <Sidebar />

            <main className="restaurantOwnerMain">
                <section className="restaurantOwnerHeader">
                    <div>
                        <p className="restaurantOwnerSubtitle">Restaurant Owner</p>
                        <h1>Manage Your Menu</h1>
                    </div>
                    <span className="restaurantOwnerBadge">Restaurant ID: {RESTAURANT_ID}</span>
                </section>

                <AddMenuItem restaurantId={RESTAURANT_ID} onItemCreated={loadMenuItems} />

                <section className="restaurantOwnerListSection">
                    <div className="restaurantOwnerListHeader">
                        <div>
                            <p className="restaurantOwnerSubtitle">Current Menu</p>
                            <h2>Food Items</h2>
                        </div>
                        <button className="restaurantRefreshBtn" onClick={loadMenuItems}>
                            Refresh
                        </button>
                    </div>

                    {loading ? (
                        <p className="restaurantEmptyText">Loading menu items...</p>
                    ) : menuItems.length === 0 ? (
                        <p className="restaurantEmptyText">No menu items yet.</p>
                    ) : (
                        <div className="restaurantMenuGrid">
                            {menuItems.map((item) => (
                                <div className="restaurantMenuCard" key={item.menuItemId}>
                                    {editingItemId === item.menuItemId ? (
                                        <div className="restaurantEditForm">
                                            <input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                placeholder="Food name"
                                            />

                                            <textarea
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                                placeholder="Description"
                                            />

                                            <input
                                                value={editImageURL}
                                                onChange={(e) => setEditImageURL(e.target.value)}
                                                placeholder="Image URL"
                                            />

                                            <input
                                                type="number"
                                                value={editPrice}
                                                onChange={(e) => setEditPrice(e.target.value)}
                                                placeholder="Price"
                                            />

                                            <div className="restaurantCardActions">
                                                <button
                                                    className="restaurantSaveBtn"
                                                    onClick={() => handleUpdate(item.menuItemId)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="restaurantCancelBtn"
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <img
                                                className="restaurantMenuImage"
                                                src={item.imageURL || "/src/assets/placeholder-image.png"}
                                                alt={item.name}
                                            />

                                            <div className="restaurantMenuContent">
                                                <h3>{item.name}</h3>
                                                <p>{item.description || "No description available."}</p>
                                                <strong>${item.price.toFixed(2)}</strong>

                                                <div className="restaurantCardActions">
                                                    <button
                                                        className="restaurantEditBtn"
                                                        onClick={() => handleEditClick(item)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="restaurantDeleteBtn"
                                                        onClick={() => handleDelete(item.menuItemId)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};