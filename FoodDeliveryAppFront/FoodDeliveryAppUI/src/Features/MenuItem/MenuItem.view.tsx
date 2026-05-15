import { useState } from "react";
import { Button } from "../../Components/Button/Button";
import { createMenuItem } from "./MenuItem";
import { MdFastfood, MdDescription, MdLink, MdAttachMoney } from "react-icons/md";
import "./MenuItem.style.css";

interface AddMenuItemProps {
    restaurantId: number;
    onItemCreated?: () => void;
}

export const AddMenuItem = ({ restaurantId, onItemCreated }: AddMenuItemProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [price, setPrice] = useState("");
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = async () => {
        if (!name || !description || !price) {
            showToast("Please fill in all required fields.", "error");
            return;
        }
        try {
            await createMenuItem({
                restaurantId,
                name,
                description,
                imageURL,
                price: parseFloat(price),
            });
            onItemCreated?.();
            handleClear();
            showToast("Food item added successfully!", "success");
        } catch (err) {
            console.error("Failed to create menu item:", err);
            showToast("Failed to add food item. Please try again.", "error");
        }
    };

    const handleClear = () => {
        setName("");
        setDescription("");
        setImageURL("");
        setPrice("");
    };

    return (
        <div className="menuItemPage">
            {toast && (
                <div className={`menuItemToast menuItemToast--${toast.type}`}>
                    {toast.message}
                </div>
            )}
            <div className="menuItemCard">
                <h2 className="menuItemTitle">Add Food Item</h2>

                <div className="menuItemForm">
                    <div className="menuItemField">
                        <label className="menuItemLabel">Dish Name</label>
                        <div className="menuItemInputWrapper">
                            <MdFastfood className="menuItemIcon" />
                            <input
                                className="menuItemInput"
                                type="text"
                                placeholder="Food"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="menuItemField">
                        <label className="menuItemLabel">Detailed Description</label>
                        <div className="menuItemInputWrapper menuItemTextareaWrapper">
                            <MdDescription className="menuItemIcon menuItemTextareaIcon" />
                            <textarea
                                className="menuItemTextarea"
                                placeholder="Food Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="menuItemField">
                        <label className="menuItemLabel">External Resource Link</label>
                        <div className="menuItemInputWrapper">
                            <MdLink className="menuItemIcon" />
                            <input
                                className="menuItemInput"
                                type="url"
                                placeholder="URL"
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                            />
                        </div>
                        <span className="menuItemHint">Insert Menu Link (optional)</span>
                    </div>

                    <div className="menuItemField">
                        <label className="menuItemLabel">Item Price</label>
                        <div className="menuItemInputWrapper menuItemPriceWrapper">
                            <MdAttachMoney className="menuItemIcon" />
                            <input
                                className="menuItemInput"
                                type="number"
                                placeholder="Price"
                                min="0"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="menuItemActions">
                        <Button className="buttonPrimary menuItemSaveBtn" onClick={handleSubmit}>
                            Save to Menu
                        </Button>
                        <Button className="buttonOutline menuItemClearBtn" onClick={handleClear}>
                            Clear
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
