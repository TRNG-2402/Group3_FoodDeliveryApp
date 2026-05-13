import "./Input.style.css";
import type { ReactElement } from "react";

interface IInput {
    type: string;
    placeholder: string;
    icon?: ReactElement;
    value?: string 
    onChange?: React.ChangeEventHandler;
}

export const Input = ({ type, placeholder, icon, value, onChange }: IInput) => {
    return (
        <div className="inputWrapper">
            {icon && <span className="inputIcon">{icon}</span>}

            <input
                className="input"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};