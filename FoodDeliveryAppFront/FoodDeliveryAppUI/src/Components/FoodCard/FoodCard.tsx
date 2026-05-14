import { useState, type Dispatch, type SetStateAction } from 'react';
import "./FoodCard.style.css";
import placeholderImage from "../../assets/placeholder-image.png";
import type { ICart } from '../../Interfaces/ICart';

interface IFoodCard {
    id: string | number;
    name: string;
    description?: string;
    price: number;
    imageURL?: string;
    quantity: number;
    setCart: Dispatch<SetStateAction<ICart>>;
}

export const FoodCard = ({ id, name, description, price, imageURL, quantity, setCart }: IFoodCard) => {

    return (
        <div className="menu-card">
            <div className="image-container">
                <img src={imageURL ?? placeholderImage} alt="classNameic Cheesefood" className="food-image" />
            </div>

            <div className="content-container">
                <div className="text-group">
                    <h2 className="food-title">{name}</h2>
                    <p className="food-description">{description}</p>
                    <strong className="food-description">${(price).toFixed(2)}</strong>
                </div>

                <div className="action-group">
                    <span className="price">${(price * quantity).toFixed(2)}</span>

                    <div className="stepper">
                        <button className="step-btn" aria-label="Decrease quantity"
                            onClick={() => {
                                setCart(cart => {
                                    const oldQuant = cart.foodItems.filter(c => c.id === id)[0];
                                    var newQuant = oldQuant.quantity - 1;
                                    if (newQuant < 0) newQuant = 0;
                                    const updatedItem = { ...oldQuant, quantity: newQuant };
                                    return {
                                        foodItems: cart.foodItems.map(e => {
                                            if (e.id === id) {
                                                e = updatedItem;
                                            }
                                            return e
                                        })
                                    }
                                })
                            }}
                        >−</button>
                        <span className="quantity">{quantity}</span>
                        <button className="step-btn" aria-label="Increase quantity"
                            onClick={() => {
                                setCart(cart => {
                                    const oldQuant = cart.foodItems.filter(c => c.id === id)[0];
                                    var newQuant = oldQuant.quantity + 1;
                                    if (newQuant > 10) newQuant = 10;
                                    const updatedItem = { ...oldQuant, quantity: newQuant };
                                    return {
                                        foodItems: cart.foodItems.map(e => {
                                            if (e.id === id) {
                                                e = updatedItem;
                                            }
                                            return e
                                        })
                                    }
                                })
                            }}
                        >+</button>

                    </div>

                </div>
            </div>
        </div>
    );
};

