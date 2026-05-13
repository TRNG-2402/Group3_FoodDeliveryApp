import "./Input.style.css";
import type { ReactElement } from "react";

interface IInput {
    type: string;
    placeholder: string;
    icon?: ReactElement;
}

export const Input = ({ type, placeholder, icon }: IInput) => {
    return (
        <div className="inputWrapper">
            {icon && <span className="inputIcon">{icon}</span>}

            <input
                className="input"
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
};