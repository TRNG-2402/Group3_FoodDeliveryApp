// Generic button, add styling and input as app progress

import type { ReactElement } from "react";
import "./Button.style.css";

interface IButton {
    children?: ReactElement | string;
    className?: string;
    onClick: any;
    customStyle?: object;
}

export const Button = ({ children, className, onClick, customStyle}: IButton) => {
    return (
        <button
            className={className}
            style={customStyle}
            onClick={onClick}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            {children}
        </button>
    );
};