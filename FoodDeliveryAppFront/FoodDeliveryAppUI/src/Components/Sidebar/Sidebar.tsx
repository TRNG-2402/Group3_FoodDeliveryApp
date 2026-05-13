import { MdFastfood, MdDashboard, MdRestaurant, MdDeliveryDining } from "react-icons/md";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import { SidebarItem } from "./SidebarItem";
import "./Sidebar.style.css";

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebarLogo">
                <MdFastfood className="sidebarLogoIcon" />
                <h2>Turbo Feast</h2>
            </div>

            <div className="sidebarMenu">
                <SidebarItem icon={<MdDashboard />} text="Dashboard" />
                <SidebarItem icon={<MdRestaurant />} text="Restaurants" />
                <SidebarItem icon={<FaShoppingBag />} text="Orders" />
                <SidebarItem icon={<MdDeliveryDining />} text="Delivery" />
                <SidebarItem icon={<FaUserCircle />} text="Profile" />
                <SidebarItem icon={<IoSettingsSharp />} text="Settings" />
            </div>
        </aside>
    );
};