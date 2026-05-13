import type { ReactElement } from "react";

interface ISidebarItem {
    icon: ReactElement;
    text: string;
}

export const SidebarItem = ({ icon, text }: ISidebarItem) => {
    return (
        <div className="sidebarItem">
            <span className="sidebarItemIcon">{icon}</span>
            <span className="sidebarItemText">{text}</span>
        </div>
    );
};