// Generic button, add styling and input as app progress

import type { ReactElement } from "react";
import "./Button.style.css";

interface IButton {
    children?: ReactElement | string;
    className?: any;
}

export const Button = ({ children, className }: IButton) => {
    return <button className={className}>{children}</button>
}