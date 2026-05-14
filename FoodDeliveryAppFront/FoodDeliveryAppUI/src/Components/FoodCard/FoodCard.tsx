import { useState, type Dispatch, type SetStateAction } from 'react';
import "./FoodCard.style.css";
import placeholderImage from "../../assets/placeholder-image.png";
import type { ICart } from '../../Interfaces/ICart';
import type { IMenuItem } from '../../Interfaces/MenuItem';

interface IFoodCard {
    id: string | number;
    name: string;
    description?: string;
    price: number;
    imageURL?: string;
    quantity: number;
    setCart: Dispatch<SetStateAction<IMenuItem[]>>;
}

export const FoodCard = ({ id, name, description, price, imageURL, quantity, setCart }: IFoodCard) => {

    return (
        <div className="menu-card">
            <div className="image-container">
                <img src={imageURL ?? placeholderImage} alt={name} className="food-image" />
            </div>

            <div className="content-container">
                <div className="text-group">
                    <h2 className="food-title">{name}</h2>
                    <p className="food-description">{description}</p>
                    <strong className="food-description">${(price).toFixed(2)}</strong>
                </div>

                <div className="action-group">
                    {/* <span className="price">${(price * quantity).toFixed(2)}</span> */}

                    <div className="stepper">
                        <button className="step-btn" aria-label="Decrease quantity"
                            onClick={() => {
                                setCart((cart: IMenuItem[]) => {
                                    const oldQuant = cart.filter(c => c.menuItemId === id)[0];
                                    var newQuant = (oldQuant?.quantity ?? 0) - 1;
                                    if (newQuant < 1) newQuant = 0;
                                    const updatedItem = { ...oldQuant, quantity: newQuant };
                                    
                                    if(newQuant < 1) return cart.filter(e => e.menuItemId !== id);

                                    return cart.map(e => {
                                        if (e.menuItemId === id) {
                                            e = updatedItem;
                                        }
                                        return e
                                    })

                                })
                            }}
                        >-</button>
                        {/* <span className="quantity">{quantity}</span> */}
                        <button className="step-btn" aria-label="Increase quantity"
                            onClick={() => {
                                const a: IMenuItem = {
                                    menuItemId: id as number, name, description, price
                                }
                                setCart((old: IMenuItem[]) => {
                                    if (!old.find(e => e.menuItemId === id))
                                        return [...old, a]
                                    return [...old];
                                });
                                setCart((cart: IMenuItem[]) => {
                                    const oldQuant = cart.filter(c => c.menuItemId === id)[0];
                                    var newQuant = (oldQuant?.quantity ?? 0) + 1;
                                    if (newQuant > 10) newQuant = 10;
                                    const updatedItem = { ...oldQuant, quantity: newQuant };

                                    return cart.map(e => {
                                        if (e.menuItemId === id) {
                                            e = updatedItem;
                                        }
                                        return e
                                    })

                                })
                            }}
                        >+</button>

                    </div>

                </div>
            </div>
        </div>
    );
};

